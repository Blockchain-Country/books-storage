import { useDispatch, useSelector } from 'react-redux'
import './BookList.css'
import { selectBook } from '../../redux/slices/BooksSlice'
import { deleteBook } from '../../redux/slices/BooksSlice'

const BookList = () => {
  const books = useSelector(selectBook)
  const dispatch = useDispatch()

  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id))
  }

  return (
    <div className="app-block book-list" data-testid="book_list_component">
      <h2>My Book List</h2>
      <div className="book-list">
        <ul>
          {!books.length ? (
            <p data-testid="no_books_sign">No books in my list...</p>
          ) : (
            books.map((book, i) => (
              <li key={book.id} data-testid={book.id}>
                <div className="book-info">
                  <span>{++i}. </span>
                  <span>{book.title}</span>
                  <span>
                    {' '}
                    by <strong>{book.author}</strong>
                  </span>
                </div>
                <div className="book-actions">
                  <button
                    onClick={() => handleDeleteBook(book.id)}
                    data-testid="delete_book_btn"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}

export default BookList
