import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBook, selectBook } from '../../../redux/slices/booksSlice'
import createBook from '../../../utils/createBook'
import Button from '../../common/button/Button'
import Modal from '../../common/modal/Modal'
import './SearchBookModal.css'

const SearchBookModal = ({ isOpen, onClose, searchResults }) => {
  const dispatch = useDispatch()
  const books = useSelector(selectBook)

  const filteredSearchResults = searchResults.filter(
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
    if (filteredSearchResults.length === 0) {
      setTimeout(() => onClose(), 0)
    }
  }, [filteredSearchResults])

  const handleAddBook = (bookFound) => {
    dispatch(addBook(createBook(bookFound)))
  }

  if (!searchResults || searchResults.length === 0)
    return <p>No books found, try again!</p>

  return (
    <Modal isOpen={isOpen} onClose={onClose} data-testid="modal_body">
      {filteredSearchResults.map((book, _) => (
        <div
          key={book.bookId}
          data-testid={`modal_book_item id=${book.bookId}`}
        >
          <div data-testid="modal_book_content">
            <div data-testid="book_left_content">
              {book.image ? (
                <img
                  src={book.image}
                  alt={`${book.title} cover`}
                  data-testid="modal_book_img"
                />
              ) : (
                'No image available'
              )}
            </div>
            <div data-testid="book_right_content">
              <h2 data-testid="modal_book_title">{book.title}</h2>
              <p>
                <strong>
                  {book.authors && book.authors.includes(', ')
                    ? 'Authors:'
                    : 'Author:'}
                </strong>{' '}
                {book.authors || 'Unknown Authors'}
              </p>
              <p>
                <strong>Published Year:</strong> {book.publishedDate || 'N/A'}
              </p>
              <p>
                <strong>Description:</strong>{' '}
                {book.description || 'No description available'}
              </p>
            </div>
          </div>
          <Button
            text="Add Book"
            onClick={() => handleAddBook(book)}
            data-testid="modal_add_book_btn"
          />
        </div>
      ))}
    </Modal>
  )
}

export default SearchBookModal
