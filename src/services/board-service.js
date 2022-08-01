// import { storageService } from './async-storage-service.js'
import store from '../store/index'
import { utilService } from './util.service.js'
import { httpService } from './http.service'
import { userService } from './user-service'
import { socketService, SOCKET_EVENT_GROP_CHANGE, SOCKET_EVENT_CONVERSION, SOCKET_EVENT_BOARD_CHANGE } from './socket.service'

import axios from 'axios'

const BOARD_KEY = 'BOARD_DB'
// const boardChannel = new BroadcastChannel('boardChannel')



// ; (() => {
//   // reviewChannel.addEventListener('message', (ev) => {
//   //   console.log('msg event', ev)
//   //   store.commit(ev.data)
//   // })
//   setTimeout(() => {
//     socketService.on(SOCKET_EVENT_BOARD_CHANGE, (msg) => {
//       console.log('GOT from socket', msg)
//       store.dispatch({ type: 'loadBoard' })
//     })

//   }, 0)

// })()


export const boardService = {
  query,
  saveGroup,
  getEmptyGroup,
  removeGroup,
  updateGroup,
  addTask,
  removeTasks,
  saveGroups,
  getTaskById,
  saveTask,
  updateTask,
  saveGroupsRows,
  duplicateTasks,
  conversionAdd,
  conversionRemove,
  saveColsOrder

}


query()

async function query() {
  const res = await httpService.get('boards')
  // const res = await httpService.get('board', boardId)
  return res
  // return storageService.query(BOARD_KEY)

}
function getEmptyGroup() {
  return ({
    title: "new group",
    color: _getColor(),
    tasks: []
  })
}

async function saveGroup(group, boardId) {
  const board = await httpService.get(`boards/${boardId}`)
  if (group.id) {
    const idx = board.groups.findIndex((g) => g.id === group.id)
    board.groups.splice(idx, 1, group)
  }
  else {
    group.id = utilService.makeId()
    board.groups.push(group)
  }
  httpService.put(`boards/${boardId}`, board)
  return group
}


async function removeGroup(groupId, boardId) {
  const board = await httpService.get(`boards/${boardId}`)
  if (board.groups.length === 1) throw new Error('Board has to have at least one group')
  const idx = board.groups.findIndex((g) => g.id === groupId)
  const groupName = board.groups[idx].title
  board.groups.splice(idx, 1)
  const savedBoard = await httpService.put(`boards/${boardId}`, board)
  // boardChannel.postMessage({ type: 'updateBoard', board: savedBoard })
  // socketService.emit(SOCKET_EVENT_BOARD_CHANGE, savedBoard)

  return groupId
}


async function updateGroup(groupId, data, boardId) {
  const pramToChange = Object.keys(data)[0]
  const parmValue = data[Object.keys(data)[0]]
  let board = await _getBoardById(boardId)
  let groupToEdit = board.groups.find((g) => g.id === groupId)
  groupToEdit[pramToChange] = parmValue
  const savedBoard = await httpService.put(`boards/${boardId}`, board)
  // boardChannel.postMessage({ type: 'updateBoard', board: savedBoard })
  // socketService.emit(SOCKET_EVENT_BOARD_CHANGE, savedBoard)
  return groupToEdit
}

async function addTask(title, groupId, boardId) {
  let board = await _getBoardById(boardId)
  console.log(board)
  let groupToEdit = board.groups.find((g) => g.id === groupId)
  const colOrder = board.colsOrder
  let task = _getEmptyTask(colOrder, title)
  task.isDone = false
  task.createdAt = Date.now()
  task.createdBy = await userService.getActiveMember()
  task.groupId = groupId
  groupToEdit.tasks.push(task)
  const savedBoard = await httpService.put(`boards/${boardId}`, board)
  // boardChannel.postMessage({ type: 'updateBoard', board: savedBoard })
  // socketService.emit(SOCKET_EVENT_BOARD_CHANGE, savedBoard)

  return task
}

async function updateTask(data, boardId) {
  try {
    const { groupId, taskId, newCol } = data
    let board = await _getBoardById(boardId)
    const groupIdx = board.groups.findIndex((group) => group.id === groupId)
    const taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === taskId)
    const colIdx = board.groups[groupIdx].tasks[taskIdx].cols.findIndex(col => col.type === newCol.type)
    board.groups[groupIdx].tasks[taskIdx].cols[colIdx] = newCol
    const savedBoard = await httpService.put(`boards/${boardId}`, board)
    // boardChannel.postMessage({ type: 'updateBoard', board: savedBoard })
    // socketService.emit(SOCKET_EVENT_BOARD_CHANGE, savedBoard)

    return { groupIdx, taskIdx, colIdx }
  }
  catch (error) {
    throw new Error('Cannot update task')
  }
}

async function _getBoardById(boardId) {
  console.log(boardId)
  const board = await httpService.get(`boards/${boardId}`)
  return board
}

function _getEmptyTask(colOrder, title) {
  let cols = []
  colOrder.forEach(col => {
    let emptyCol = { type: col.type, value: null }
    if (col.type === 'item') emptyCol.value = title
    if (col.type === 'priority') emptyCol.value = 'pDefault'
    if (col.type === 'status') emptyCol.value = 'sDefault'
    if (col.type === 'labelCmp') emptyCol.value = 'lDefault'
    if (col.type === 'creationLog') emptyCol.value = Date.now()
    cols.push(emptyCol)
  })
  return { id: utilService.makeId(), cols }
}

async function removeTasks(idsToRemove, boardId) {
  let board = await _getBoardById(boardId)
  board.groups.map(group => {
    // let groupToUpdate = board.groups.find(g => g.id === group.id)
    group.tasks = group.tasks.filter(task => !idsToRemove.includes(task.id))
  })
  const savedBoard = await httpService.put(`boards/${boardId}`, board)
  // boardChannel.postMessage({ type: 'updateBoard', board: savedBoard })
  return board.groups
}
async function duplicateTasks(idsToDup, boardId) {
  let board = await _getBoardById(boardId)
  const activeUser = await userService.getActiveMember()
  board.groups.forEach(group => {
    group.tasks.forEach((task) => {
      if (idsToDup.includes(task.id)) {
        let newTask = JSON.parse(JSON.stringify(task))
        newTask.cols[board.colsOrder.findIndex(col => col.type === 'creationLog')].value = Date.now()
        newTask.id = utilService.makeId()
        newTask.createdAt = Date.now()
        newTask.createdBy = activeUser
        const idx = board.groups.findIndex(group => group.id === task.groupId)
        board.groups[idx].tasks.push(newTask)
      }
    })
  })
  const savedBoard = await httpService.put(`boards/${boardId}`, board)
  // boardChannel.postMessage({ type: 'updateBoard', board: savedBoard })
  return board.groups


}
async function saveGroups(groups, boardId) {
  let board = await _getBoardById(boardId)
  board.groups = groups
  const savedBoard = await httpService.put(`boards/${boardId}`, board)
  socketService.on(SOCKET_EVENT_GROP_CHANGE)
  // boardChannel.postMessage({ type: 'updateBoard', board: savedBoard })

  return
}

async function saveTask(task, boardId) {
  let newTask = JSON.parse(JSON.stringify(task))
  const activeUser = await userService.getActiveMember()
  let board = await _getBoardById(boardId)
  newTask.id = utilService.makeId()
  newTask.createdAt = Date.now()
  newTask.createdBy = activeUser
  newTask.cols[board.colsOrder.findIndex(col => col.type === 'creationLog')].value = Date()
  const idx = board.groups.findIndex(group => group.id === task.groupId)
  board.groups[idx].tasks.push(newTask)
  const savedBoard = await httpService.put(`boards/${boardId}`, board)
  // boardChannel.postMessage({ type: 'updateBoard', board: savedBoard })
  return newTask
}

async function getTaskById(boardId, taskId) {
  if (!boardId) return
  let board = await _getBoardById(boardId)
  let group = board.groups.find((g) => {
    return g.tasks.find((t) =>
      t.id === taskId)
  })
  return group.tasks.find(t => t.id === taskId)

}


async function saveGroupsRows(board) {
  // let newTasksList = JSON.parse(JSON.stringify(value))
  // newTasksList = newTasksList.map((task) => {
  //   task.groupId = groupId
  //   return task
  // })

  // let board = await _getBoardById(boardId)
  // const idx = board.groups.findIndex(group => group.id === groupId)
  // board.groups[idx].tasks = newTasksList
  // board = board
  try {
    const savedBoard = await httpService.put(`boards/${board._id}`, board)
    // boardChannel.postMessage({ type: 'updateBoard', board: savedBoard })
  } catch (error) {
    console.log('error:', error)
  }

}

async function _getGroupById(boardId, groupId) {
  const board = await _getBoardById(boardId)
  return board.groups.find((g) => g.id === groupId)
}





async function conversionAdd(ids, mgsContent) {
  const { groupId, taskId, boardId } = ids
  let board = await _getBoardById(boardId)
  const groupIdx = board.groups.findIndex((group) => group.id === groupId)
  const taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === taskId)

  if (!board.groups[groupIdx].tasks[taskIdx].conversion) {
    board.groups[groupIdx].tasks[taskIdx].conversion = []
  }
  mgsContent.id = utilService.makeId()
  mgsContent.replies = []
  board.groups[groupIdx].tasks[taskIdx].conversion.unshift(mgsContent)
  await httpService.put(`boards/${boardId}`, board)
  let updatedConversion = board.groups[groupIdx].tasks[taskIdx].conversion
  return updatedConversion
}

async function saveColsOrder(newOrder, boardId) {
  let board = await _getBoardById(boardId)
  board.colsOrder = newOrder
  await httpService.put(`boards/${boardId}`, board)

}

async function conversionRemove(ids, updateId) {
  const { groupId, taskId, boardId } = ids
  let board = await _getBoardById(boardId)
  const groupIdx = board.groups.findIndex((group) => group.id === groupId)
  const taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === taskId)
  const updateIdx = board.groups[groupIdx].tasks[taskIdx].conversion.findIndex(update => update.id === updateId)
  board.groups[groupIdx].tasks[taskIdx].conversion.splice(updateIdx, 1)
  await httpService.put(`boards/${boardId}`, board)
  let updatedConversion = board.groups[groupIdx].tasks[taskIdx].conversion
  return updatedConversion
}


function _getColor() {
  const colors = [
    '#227f4c',
    '#3ac874',
    '#9cd325',
    '#c9b641',
    '#ffcb00',
    '#784bd1',
    '#a25ddc',
    '#0486c0',
    '#65cbff',
    '#bb3354',
    '#f8168a',
    '#f85ac4',
    '#fb642e',
    '#fdab3d',
    '#7e5347',
    '#c4c4c4',
    '#808080'
  ]

  return colors[utilService.getRandomInt(0, colors.length)]
}

