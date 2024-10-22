import { useState } from 'react'
import { useDispatch } from 'react-redux'
import './BookForm.css'
import { addBook } from '../../redux/slices/BooksSlice'
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
      data-testid="book_form_component"
      onSubmit={handleSubmit}
    >
      <h2>BookForm</h2>
      <form className="book-form">
        <div>
          <label>Title:</label>
          <input
            type="text"
            placeholder="Enter book title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            data-testid="book_form_title_input"
          ></input>
        </div>
        <div>
          <label>Author: </label>
          <input
            type="text"
            placeholder="Enter book author..."
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            data-testid="book_form_author_input"
          ></input>
        </div>
        <button type="submit" data-testid="book_form_sbmit_btn">
          Add book
        </button>
      </form>
    </div>
  )
}

export default BookForm
