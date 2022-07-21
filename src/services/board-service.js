import { storageService } from './async-storage-service.js'

// const BOOKS_KEY = 'BOOKS_DB'

// export const bookService = {
//   query,
//   get,
//   addReview,
//   getEmptyReview,
//   removeReview
// }

// _createBooks()

// function query() {
//   return storageService.query(BOOKS_KEY)
// }

// function get(bookId) {
//   return storageService.get(BOOKS_KEY, bookId)
// }

// function getEmptyReview() {
//   return {
//     rederName: '',
//     rate: '',
//     readingDate: '',
//     bookReview: ''
//   }
// }

// function addReview(bookId, review) {
//   review.id = utilService.makeId()
//   return get(bookId)
//     .then(book => {
//       if (!book.reviews) book.reviews = []
//       book.reviews.push(review)
//       return storageService.put(BOOKS_KEY, book)
//     })
// }

// function removeReview(bookId, reviewId) {
//   return get(bookId)
//     .then(book => {
//       const idx = book.reviews.findIndex(review => review.id === reviewId)
//       book.reviews.splice(idx, 1)
//       return storageService.put(BOOKS_KEY, book)
//     })
// }

// function _createBooks() {
//   let books = utilService.loadFromStorage(BOOKS_KEY)
//   if (!books || !books.length || books === 'undefined') {
//     utilService.saveToStorage(BOOKS_KEY, gBooks)
//   }
//   return books
// }