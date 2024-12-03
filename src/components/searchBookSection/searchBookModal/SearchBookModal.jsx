import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBook, selectBook } from '../../../redux/slices/booksSlice'
import createBook from '../../../utils/createBook'
import Button from '../../common/button/Button'
import Modal from '../../common/modal/Modal'
import './SearchBookModal.css'

const SearchBookModal = ({ isOpen, onClose, booksFoundList }) => {
  const dispatch = useDispatch()
  const books = useSelector(selectBook)

  const filteredAddedBooks = booksFoundList.filter(
    (bookFound) =>
      !books.some(
        (book) =>
          book.title.toLowerCase() === bookFound.title.toLowerCase() &&
          book.authors &&
          bookFound.authors &&
          book.authors.toLowerCase() === bookFound.authors.toLowerCase()
      )
  )

  useEffect(() => {
    if (isOpen && filteredAddedBooks.length === 0) {
      setTimeout(() => onClose(), 0)
    }
  }, [isOpen, filteredAddedBooks, onClose])

  const handleAddBook = (bookFound) => {
    dispatch(addBook(createBook(bookFound)))
  }

  if (!booksFoundList || booksFoundList.length === 0)
    return <p>No books found, try again!</p>

  return (
    <Modal isOpen={isOpen} onClose={onClose} data-testid="modal_body">
      {filteredAddedBooks.map((bookFound, _) => (
        <div
          key={bookFound.bookId}
          data-testid={`modal_book_item id=${bookFound.bookId}`}
        >
          <div data-testid="modal_book_content">
            <div data-testid="book_left_content">
              {bookFound.image ? (
                <img
                  src={bookFound.image}
                  alt={`${bookFound.title} cover`}
                  data-testid="modal_book_img"
                />
              ) : (
                'No image available'
              )}
            </div>
            <div data-testid="book_right_content">
              <h2 data-testid="modal_book_title">{bookFound.title}</h2>
              <p>
                <strong>
                  {bookFound.authors && bookFound.authors.includes(', ')
                    ? 'Authors:'
                    : 'Author:'}
                </strong>{' '}
                {bookFound.authors || 'Unknown Authors'}
              </p>
              <p>
                <strong>Published Year:</strong>{' '}
                {bookFound.publishedDate || 'N/A'}
              </p>
              <p>
                <strong>Description:</strong>{' '}
                {bookFound.description || 'No description available'}
              </p>
            </div>
          </div>
          <Button
            text="Add Book"
            onClick={() => handleAddBook(bookFound)}
            data-testid="modal_add_book_btn"
          />
        </div>
      ))}
    </Modal>
  )
}

export default SearchBookModal
