// BookSearchModal.js
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBook, selectBook } from '../../redux/slices/booksSlice'
import createBook from '../../utils/createBook'
import './SearchBookModal.css'

const BookSearchModal = ({ isOpen, onClose, booksFoundList }) => {
  const dispatch = useDispatch()
  const books = useSelector(selectBook)

  if (!isOpen) return null
  if (!booksFoundList || booksFoundList.length === 0)
    return <p>No bookFound details available</p>

  const filteredBooksFoundList = booksFoundList.filter(
    (bookFound) => !books.some((book) => book.title === bookFound.title)
  )

  const handleAddBook = (bookFound) => {
    dispatch(
      addBook(createBook({ title: bookFound.title, author: bookFound.authors }))
    )
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <button className="modal-close" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="modal-body">
          {filteredBooksFoundList.map((bookFound, index) => (
            <div key={bookFound.id} className="bookFound-item">
              <h2>{bookFound.title}</h2>
              <div>
                {bookFound.image ? (
                  <img src={bookFound.image} alt={`${bookFound.title} cover`} />
                ) : (
                  'No image available'
                )}
              </div>
              <p>
                <strong>
                  {bookFound.authors && bookFound.authors.includes(', ')
                    ? 'Authors:'
                    : 'Author:'}
                </strong>{' '}
                {bookFound.authors ? bookFound.authors : 'Unknown Author'}
              </p>
              <p>
                <strong>Published Year:</strong> {bookFound.publishedDate}
              </p>
              <p>
                <strong>Description:</strong>{' '}
                {bookFound.description || 'No description available'}
              </p>
              <button
                onClick={() => handleAddBook(bookFound)}
                data-testid="searchBookModal_addBookBtn"
              >
                Add Book
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BookSearchModal
