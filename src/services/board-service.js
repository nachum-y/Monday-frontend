import { storageService } from './async-storage-service.js'
import { utilService } from './util.service.js'
const BOARD_KEY = 'BOARD_DB'

export const boardService = {
  query,
  //   get,
  saveGroup,
  getEmptyGroup,
  removeGroup,
  updateGroup,
  addTask,
  removeTasks,
  saveGroups,
  getTaskById,
  saveTask,
  updateTask
}

// _createBoards()
query()

function query() {
  // storageService.query().then(console.log)
  return storageService.query(BOARD_KEY)
}

function get(boardId) {
  return storageService.get(BOARD_KEY, boardId)
}

function getEmptyGroup() {
  return ({
    title: "new group",
    color: _getColor(),
    tasks: []
  })
}

async function saveGroup(group, boardId) {
  const board = await storageService.get(BOARD_KEY, boardId)
  if (group.id) {
    const idx = board.groups.findIndex((g) => g.id === group.id)
    board.groups.splice(idx, 1, group)
  }
  else {
    group.id = utilService.makeId()
    board.groups.push(group)
  }
  storageService.put(BOARD_KEY, board)
  return group
}


async function removeGroup(groupId, boardId) {
  const board = await storageService.get(BOARD_KEY, boardId)
  if (board.groups.length === 1) throw new Error('Board has to have at least one group')
  const idx = board.groups.findIndex((g) => g.id === groupId)
  board.groups.splice(idx, 1)
  storageService.put(BOARD_KEY, board)
  return groupId
  // return get(bookId)
  //   .then(book => {
  //     const idx = book.reviews.findIndex(review => review.id === reviewId)
  //     book.reviews.splice(idx, 1)
  //     return storageService.put(BOOKS_KEY, book)
  //   })
}


async function updateGroup(groupId, data, boardId) {
  const board = await storageService.get(BOARD_KEY, boardId)
  // if (board.groups.length === 1) throw new Error('Board has to have at least one group')
  let groupToEdit = board.groups.find((g) => g.id === groupId)
  groupToEdit[Object.keys(data)[0]] = data[Object.keys(data)[0]]
  // board.groups.splice(idx, 1)
  storageService.put(BOARD_KEY, board)
  return groupToEdit
}

async function addTask(title, groupId, boardId) {
  let board = await _getBoardById(boardId)
  let groupToEdit = board.groups.find((g) => g.id === groupId)
  const colOrder = board.colsOrder
  let task = _getEmptyTask(colOrder, title)
  task.groupId = groupId
  groupToEdit.tasks.push(task)
  storageService.put(BOARD_KEY, board)
  return task
}


async function updateTask(data, boardId){
  try{

  const { groupId , taskId , newCol } = data
  let board = await _getBoardById(boardId)
  const groupIdx = board.groups.findIndex((group) => group.id === groupId)
  const taskIdx = board.groups[groupIdx].tasks.findIndex(task=>task.id === taskId)
  const colIdx = board.groups[groupIdx].tasks[taskIdx].cols.findIndex(col=>col.type === newCol.type)
  board.groups[groupIdx].tasks[taskIdx].cols[colIdx] = newCol
  storageService.put(BOARD_KEY, board)
  return {groupIdx,taskIdx,colIdx}
  
  }
    catch (error) {
    throw new Error('Cannot update')
  }
}

async function _getBoardById(boardId) {
  return await storageService.get(BOARD_KEY, boardId)
}

function _getEmptyTask(colOrder, title) {
  let cols = []
  colOrder.forEach(col => {
    let emptyCol = { type: col.type, value: null }
    if (col.type === 'item') emptyCol.value = title
    if (col.type === 'priority') emptyCol.value = 'pDefault'
    if (col.type === 'status') emptyCol.value = 'sDefault'
    if (col.type === 'labelCmp') emptyCol.value = 'lDefault'
    if (col.type === 'creationLog') emptyCol.value = Date()
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
  storageService.put(BOARD_KEY, board)
  return board.groups
}

async function saveGroups(groups, boardId) {
  let board = await _getBoardById(boardId)
  board.groups = groups
  storageService.put(BOARD_KEY, board)
  return
}

async function saveTask(task, boardId) {
  let board = await _getBoardById(boardId)
  task.id = utilService.makeId()
  const idx = board.groups.findIndex(group => group.id === task.groupId)
  board.groups[idx].tasks.push(task)
  storageService.put(BOARD_KEY, board)
  return task
}

async function getTaskById(boardId, taskId) {
  let board = await _getBoardById(boardId)
  // console.log(board.groups)
  // let task
  // let res
  // res = board.groups.forEach((g) => {
  //   task = (g.tasks.find((t) => t.id === taskId))

  //   if (task) return task

  // })
  // console.log(res)

}

async function _getGroupById(boardId, groupId) {
  const board = await _getBoardById(boardId)
  return board.groups.find((g) => g.id === groupId)
}

// async function _getBoardColOrder(boardId){
//   const board = await _getBoardById(boardId)
//   return board.groups.find((g) => g.id === groupId)
// }

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

