import { useDispatch } from 'react-redux'
import { addBook } from '../../../redux/slices/booksSlice'
import createBook from '../../../utils/createBook'
import Button from '../../common/button/Button'
import Modal from '../../common/modal/Modal'
import './RandomBookModal.css'

const RandomBookModal = ({ isOpen, onClose, modalBook, isBookExist }) => {
  const dispatch = useDispatch()

  const handleAddBook = (book) => {
    dispatch(addBook(createBook(book)))
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} data-testid="modal_body">
      {modalBook && (
        <div
          key={modalBook.bookId}
          data-testid={`modal_book_item id=${modalBook.bookId}`}
        >
          <div data-testid="modal_book_content">
            <div data-testid="book_left_content">
              {modalBook.image ? (
                <img
                  src={modalBook.image}
                  alt={`${modalBook.title} cover`}
                  data-testid="modal_book_img"
                />
              ) : (
                'No image available'
              )}
            </div>
            <div data-testid="book_right_content">
              <h2 data-testid="modal_book_title">{modalBook.title}</h2>
              <p>
                <strong>
                  {modalBook.authors && modalBook.authors.includes(', ')
                    ? 'Authors:'
                    : 'Author:'}
                </strong>{' '}
                {modalBook.authors || 'Unknown Authors'}
              </p>
              <p>
                <strong>Published Year:</strong>{' '}
                {modalBook.publishedDate || 'N/A'}
              </p>
              <p>
                <strong>Description:</strong>{' '}
                {modalBook.description || 'No description available'}
              </p>
            </div>
          </div>
          {isBookExist ? (
            <div>
              <p>You already have this book in the list</p>
            </div>
          ) : (
            <Button
              text="Add Book"
              onClick={() => handleAddBook(modalBook)}
              data-testid="modal_add_book_btn"
            />
          )}
        </div>
      )}
    </Modal>
  )
}

export default RandomBookModal
