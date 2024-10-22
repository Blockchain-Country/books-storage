import { useSelector } from 'react-redux'
import './BookList.css'
import { selectBook } from '../../redux/slices/BooksSlice'

const BookList = () => {
  const books = useSelector(selectBook)

  return (
    <div className="app-block book-list" data-testid="book_list_component">
      <h2>My Book List</h2>
      <div className="book-list">
        <ul>
          {!books.length ? (
            <p data-testid="no_books_sign">No books in my list...</p>
          ) : (
            books.map((book, i) => (
              <li key={i}>
                <div className="book-info">
                  <span>{++i}. </span>
                  <span>{book.title}</span>
                  <span>
                    {' '}
                    by <strong>{book.author}</strong>
                  </span>
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
