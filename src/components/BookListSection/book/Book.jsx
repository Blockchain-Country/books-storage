import { TbStar } from 'react-icons/tb'
import { TbStarFilled } from 'react-icons/tb'
import './Book.css'
import Button from '../../common/button/Button'

const Book = ({
  book,
  index,
  onHandleDeleteBook,
  onToggleFavoriteBook,
  ...rest
}) => {
  return (
    <li {...rest}>
      <span data-testid="book_index">{++index}.</span>
      <div data-testid="book_title_and_author_wrapper">
        <div data-testid="book_title_wrapper">
          <span data-testid="book_title">{book.title}</span>
        </div>
        <div data-testid="book_author_wrapper">
          <em>by</em>
          <span data-testid="book_author">{book.authors}</span>
        </div>
      </div>
      <div data-testid="book_actions">
        <span
          onClick={() => onToggleFavoriteBook(book.id)}
          data-testid={`book_favorite_toggle_${book.isFavorite}`}
        >
          {book.isFavorite ? (
            <TbStarFilled data-testid="book_favorite_icon" />
          ) : (
            <TbStar data-testid="book_nonFavorite_icon" />
          )}
        </span>
        <Button
          text="Delete"
          onClick={() => onHandleDeleteBook(book.id)}
          data-testid="delete_book_btn"
        ></Button>
      </div>
    </li>
  )
}

export default Book
