import { useDispatch, useSelector } from 'react-redux'
import Book from './book/Book'
import './BookListSection.css'
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

const BookListSection = ({ 'data-testid': testId }) => {
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

  const highlightFilterMatch = (text, filter) => {
    if (!filter) return text

    const regex = new RegExp(`(${filter})`, 'gi')

    return text.split(regex).map((substring, i) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={i} data-testid="highlighted_text">
            {substring}
          </span>
        )
      }
      return substring
    })
  }

  return (
    <section data-testid={testId}>
      <h3 data-testid="bookList_title">My Book List</h3>
      <ul data-testid="bookList_container">
        {!filteredBooksArr.length ? (
          <p data-testid="bookList_emptyMsg">No books in my list...</p>
        ) : (
          filteredBooksArr.map((book, i) => (
            <Book
              key={book.id}
              index={i}
              book={book}
              bookTitle={highlightFilterMatch(book.title, titleFilter)}
              bookAuthor={highlightFilterMatch(book.authors, authorsFilter)}
              onHandleDeleteBook={handleDeleteBook}
              onToggleFavoriteBook={toggleFavoriteBook}
              data-testid={`bookList_item id=${book.id}`}
            />
          ))
        )}
      </ul>
    </section>
  )
}

export default BookListSection
