import { storageService } from './async-storage-service.js'
import { utilService } from './util.service.js'
const BOARD_KEY = 'BOARD_DB'

export const boardService = {
  query,
  //   get,
  saveGroup,
  getEmptyGroup,
  removeGroup,
  updateGroup
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


function _createBoards() {
  let books = utilService.loadFromStorage(BOOKS_KEY)
  if (!books || !books.length || books === 'undefined') {
    utilService.saveToStorage(BOOKS_KEY, gBooks)
  }
  return books
}
