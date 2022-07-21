import { storageService } from './async-storage-service.js'

const BOARD_KEY = 'BOARD_DB'

export const boardService = {
  query,
  get,
  addGroup,
  getEmptyGroup,
  removeGroup
}

// _createBoards()
query()

function query() {
    storageService.query().then(console.log)
//   return storageService.query(BOARD_KEY)
}

function get(boardId) {
  return storageService.get(BOARD_KEY, boardId)
}

function getEmptyGroup() {
  return {
    rederName: '',
    rate: '',
    readingDate: '',
    bookReview: ''
  }
}

function addGroup(groupId, group) {
    group.id = utilService.makeId()
  return get(bookId)
    .then(book => {
      if (!book.reviews) book.reviews = []
      book.reviews.push(review)
      return storageService.put(BOOKS_KEY, book)
    })
}

function removeReview(bookId, reviewId) {
  return get(bookId)
    .then(book => {
      const idx = book.reviews.findIndex(review => review.id === reviewId)
      book.reviews.splice(idx, 1)
      return storageService.put(BOOKS_KEY, book)
    })
}

function _createBoards() {
  let books = utilService.loadFromStorage(BOOKS_KEY)
  if (!books || !books.length || books === 'undefined') {
    utilService.saveToStorage(BOOKS_KEY, gBooks)
  }
  return books
}