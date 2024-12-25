import { TbStar } from 'react-icons/tb'
import { TbStarFilled } from 'react-icons/tb'
import Button from '../../common/button/Button'
import Modal from '../../common/modal/Modal'
import './BookListModal.css'

const BookListModal = ({
  isOpen,
  onClose,
  modalBook,
  onHandleDeleteBook,
  onToggleFavoriteBook,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} data-testid="bookListModal_body">
      {modalBook && (
        <div
          key={modalBook.id}
          data-testid={`bookListModal_book_item id=${modalBook.id}`}
        >
          <div data-testid="bookListModal_book_content">
            <div data-testid="bookListModal_left_content">
              {modalBook.image ? (
                <img
                  src={modalBook.image}
                  alt={`${modalBook.title} cover`}
                  data-testid="bookListModal_book_img"
                />
              ) : (
                'No image available'
              )}
            </div>
            <div data-testid="bookListModal_right_content">
              <h2 data-testid="bookListModal_book_title">{modalBook.title}</h2>
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
              <div data-testid="bookListModal_actions_wrapper">
                <Button
                  onClick={() => onToggleFavoriteBook(modalBook.id)}
                  data-testid={`bookListModal_favorite_toggle_${modalBook.isFavorite}`}
                >
                  {modalBook.isFavorite ? (
                    <TbStarFilled data-testid="bookListModal_favorite_icon" />
                  ) : (
                    <TbStar data-testid="bookListModal_nonFavorite_icon" />
                  )}
                </Button>
                <Button
                  text="Delete"
                  disabled={modalBook.isFavorite}
                  onClick={() => onHandleDeleteBook(modalBook.id)}
                  data-testid="bookListModal_delete_btn"
                ></Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}

export default BookListModal
