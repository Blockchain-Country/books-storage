import { useState } from 'react'
import { useDispatch } from 'react-redux'
import './ManualBookForm.css'
import { addBook } from '../../redux/slices/booksSlice'
import createBook from '../../utils/createBook'

const BookForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title && author) {
      dispatch(addBook(createBook({ title, author })))
      setTitle('')
      setAuthor('')
    }
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
          <label>Author: </label>
          <input
            type="text"
            placeholder="Enter book author..."
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            data-testid="manualBookForm_aurthorInput"
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
