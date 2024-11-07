import { TbStar } from 'react-icons/tb'
import { TbStarFilled } from 'react-icons/tb'
import './Book.css'

const book = ({ book, index, onHandleDeleteBook, onToggleFavoriteBook }) => {
  return (
    <>
      <li className="book-item" key={book.id} data-testid={book.id}>
        <div className="book-info">
          <span>{++index}. </span>
          <span>{'"'}</span>
          <span>{book.title}</span>
          <span>
            {'" '}
            by <strong>{book.authors}</strong>
          </span>
        </div>
        <div className="book-actions">
          <span
            onClick={() => onToggleFavoriteBook(book.id)}
            data-testid={`isFavorite_${book.isFavorite}`}
          >
            {book.isFavorite ? (
              <TbStarFilled className="star-icon" />
            ) : (
              <TbStar className="star-icon" />
            )}
          </span>
          <button
            onClick={() => onHandleDeleteBook(book.id)}
            data-testid="delete_book_btn"
          >
            Delete
          </button>
        </div>
      </li>
    </>
  )
}

export default book
