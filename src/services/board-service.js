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
  removeTasks
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
    color: "blue",
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


async function removeGroup(group, boardId) {
  const board = await storageService.get(BOARD_KEY, boardId)
  if (board.groups.length === 1) throw new Error('Board has to have at least one group')
  const idx = board.groups.findIndex((g) => g.id === group.id)
  board.groups.splice(idx, 1)
  storageService.put(BOARD_KEY, board)
  return group.id
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

async function addTask(title,groupId, boardId){
  let board = await _getBoardById(boardId)
  let groupToEdit = board.groups.find((g) => g.id === groupId)
  const colOrder = board.colsOrder
  let task = _getEmptyTask(colOrder,title)
  task.groupId = groupId
  groupToEdit.tasks.push(task)
  storageService.put(BOARD_KEY, board)
  return task
}

async function _getBoardById(boardId){
  return await storageService.get(BOARD_KEY, boardId)
}

function _getEmptyTask(colOrder,title){
  let cols = []
  colOrder.forEach(col=>{
    let emptyCol = {type : col.type, value : null}
    if (col.type === 'item') emptyCol.value = title
    cols.push(emptyCol)
  })
  return {id:utilService.makeId(),cols}
}

async function removeTasks(idsToRemove,boardId){
  let board = await _getBoardById(boardId)
  const filteredGroups = board.groups.map(group=>group.tasks.filter(task=>!idsToRemove.includes(task.id)))
  // board.groups = filteredGroups
  console.log(board.groups.tasks)
  console.log(filteredGroups)
  // storageService.put(BOARD_KEY, board)
  return filteredGroups
}

// async function _getGroupById(boardId,groupId){
//   const board = await _getBoardById(boardId)
//   return board.groups.find((g) => g.id === groupId)
// }

// async function _getBoardColOrder(boardId){
//   const board = await _getBoardById(boardId)
//   return board.groups.find((g) => g.id === groupId)
// }



