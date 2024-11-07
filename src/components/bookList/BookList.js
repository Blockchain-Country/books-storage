import { useDispatch, useSelector } from 'react-redux'
import Book from '../book/Book'
import './BookList.css'
import {
  selectBook,
  deleteBook,
  toggleFavorite,
} from '../../redux/slices/booksSlice'
import {
  selectTitleFilter,
  selectAuthorsFilter,
} from '../../redux/slices/filterSlice'
import { setError } from '../../redux/slices/errorSlice'

const BookList = () => {
  const dispatch = useDispatch()
  const books = useSelector(selectBook)
  const titleFilter = useSelector(selectTitleFilter)
  const authorsFilter = useSelector(selectAuthorsFilter)

  const handleDeleteBook = (id) => {
    books.forEach((book) => {
      if (book.id === id && !book.isFavorite) {
        dispatch(deleteBook(id))
      } else if (book.isFavorite) {
        dispatch(setError("Can't Delete Favorite Book!"))
      }
    })
  }

  const toggleFavoriteBook = (id) => {
    dispatch(toggleFavorite(id))
  }

  const filteredBooksArr = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
      book.authors.toLowerCase().includes(authorsFilter.toLowerCase())
    )
  })

  return (
    <div className="app-block book-list" data-testid="bookList_component">
      <h2>My Book List</h2>
      <div className="book-list">
        <ul>
          {!filteredBooksArr.length ? (
            <p data-testid="no_books_sign">No books in my list...</p>
          ) : (
            filteredBooksArr.map((book, i) => (
              <Book
                key={book.id}
                book={book}
                index={i}
                onHandleDeleteBook={handleDeleteBook}
                onToggleFavoriteBook={toggleFavoriteBook}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  )
}

export default BookList
