import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBook, selectBook } from '../../redux/slices/booksSlice'
import createBook from '../../utils/createBook'
import './ManualBookForm.css'
import { setError } from '../../redux/slices/errorSlice'

const BookForm = () => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [authors, setAuthors] = useState('')

  const books = useSelector(selectBook)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim() && authors.trim()) {
      const filteredBooks = books.find(
        (existedBook) =>
          existedBook.title.toLowerCase() === title.toLowerCase() &&
          existedBook.authors.toLowerCase() === authors.toLowerCase()
      )
      if (!filteredBooks) {
        dispatch(addBook(createBook({ title, authors })))
      }
    } else {
      dispatch(setError('Enter both Title and Author!'))
    }
    setTitle('')
    setAuthors('')
  }

  return (
    <div
      className="app-block book-form"
      data-testid="manualBookForm_component"
      onSubmit={handleSubmit}
    >
      <form className="book-form">
        <label>or</label>
        <h2>Add Book</h2>
        <div>
          <label>Title:</label>
          <input
            type="text"
            placeholder="Enter book title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            data-testid="manualBookForm_titleInput"
          ></input>
        </div>
        <div>
          <label>Author(s): </label>
          <input
            type="text"
            placeholder="Enter book author(s)..."
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
            data-testid="manualBookForm_authorsInput"
          ></input>
        </div>
        <button type="submit" data-testid="manualBookForm_submitBtn">
          Add book
        </button>
      </form>
    </div>
  )
}

export default BookForm
