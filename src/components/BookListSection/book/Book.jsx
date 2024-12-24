import { TbStar } from 'react-icons/tb'
import { TbStarFilled } from 'react-icons/tb'
import Button from '../../common/button/Button'
import './Book.css'

const Book = ({
  index,
  book,
  bookTitle,
  bookAuthor,
  onHandleDeleteBook,
  onToggleFavoriteBook,
  onClick,
  'data-testid': testId,
}) => {
  return (
    <li onClick={onClick} data-testid={testId}>
      <span data-testid="book_index">{++index}.</span>
      <div data-testid="book_title_and_author_wrapper">
        <div data-testid="book_title_wrapper">
          <span data-testid="book_title">{bookTitle}</span>
        </div>
        <div data-testid="book_author_wrapper">
          <em>by</em>
          <span data-testid="book_author">{bookAuthor}</span>
        </div>
      </div>
      <div data-testid="book_actions">
        <Button
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavoriteBook(book.id)
          }}
          data-testid={`book_favorite_toggle_${book.isFavorite}`}
        >
          {book.isFavorite ? (
            <TbStarFilled data-testid="book_favorite_icon" />
          ) : (
            <TbStar data-testid="book_nonFavorite_icon" />
          )}
        </Button>
        <Button
          text="Delete"
          onClick={(e) => {
            e.stopPropagation()
            onHandleDeleteBook(book.id)
          }}
          data-testid="delete_book_btn"
        ></Button>
      </div>
    </li>
  )
}

export default Book
