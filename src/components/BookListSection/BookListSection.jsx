import { useEffect, useState } from 'react'
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
import BookListModal from './bookListModal/BookListModal'

const BookListSection = ({ 'data-testid': testId }) => {
  const dispatch = useDispatch()
  const books = useSelector(selectBook)
  const titleFilter = useSelector(selectTitleFilter)
  const authorsFilter = useSelector(selectAuthorsFilter)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalBook, setModalBook] = useState(null)

  useEffect(() => {
    if (process.env.NODE_ENV !== 'test') {
      dispatch(syncLoadBook())
    }
  }, [dispatch])

  useEffect(() => {
    if (isModalOpen && modalBook) {
      const updatedBookState = books.find((book) => book.id === modalBook.id)
      if (updatedBookState) {
        setModalBook(updatedBookState)
      }
    }
  }, [books, isModalOpen, modalBook])

  const handleDeleteBook = (id) => {
    const book = books.find((book) => book.id === id)
    if (book) {
      if (!book.isFavorite) {
        dispatch(syncDeleteBook(id))
        setIsModalOpen(false)
        setModalBook(null)
      } else {
        dispatch(setError("Can't Delete Favorite Book!"))
      }
    }
  }

  const toggleFavoriteBook = (id) => {
    dispatch(syncToggleFavorite(id))
  }

  const handleOpenBookModal = (id) => {
    const book = books.find((book) => book.id === id)
    if (book) {
      setIsModalOpen(true)
      setModalBook(book)
    }
  }

  const handleCloseBookModal = () => {
    setIsModalOpen(false)
    setModalBook(null)
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
              onClick={() => handleOpenBookModal(book.id)}
              data-testid={`bookList_item id=${book.id}`}
            />
          ))
        )}
      </ul>
      {isModalOpen && (
        <BookListModal
          isOpen={isModalOpen}
          onClose={handleCloseBookModal}
          modalBook={modalBook}
          onHandleDeleteBook={handleDeleteBook}
          onToggleFavoriteBook={toggleFavoriteBook}
        ></BookListModal>
      )}
    </section>
  )
}

export default BookListSection
