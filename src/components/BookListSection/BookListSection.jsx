import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setError } from '../../redux/slices/errorSlice'
import Book from './book/Book'
import './BookListSection.css'
import {
  selectBook,
  syncLoadBook,
  syncDeleteBook,
  syncToggleFavorite,
} from '../../redux/slices/booksSlice'
import {
  selectTitleFilter,
  selectAuthorsFilter,
} from '../../redux/slices/filterSlice'

const BookListSection = ({ 'data-testid': testId }) => {
  const dispatch = useDispatch()
  const books = useSelector(selectBook)
  const titleFilter = useSelector(selectTitleFilter)
  const authorsFilter = useSelector(selectAuthorsFilter)

  useEffect(() => {
    if (process.env.NODE_ENV !== 'test') {
      dispatch(syncLoadBook())
    }
  }, [dispatch])

  const handleDeleteBook = (id) => {
    const book = books.find((book) => book.id === id)
    if (book) {
      if (!book.isFavorite) {
        dispatch(syncDeleteBook(id))
      } else {
        dispatch(setError("Can't Delete Favorite Book!"))
      }
    }
  }

  const toggleFavoriteBook = (id) => {
    dispatch(syncToggleFavorite(id))
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
