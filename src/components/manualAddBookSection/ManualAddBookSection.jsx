import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBook, selectBook } from '../../redux/slices/booksSlice'
import createBook from '../../utils/createBook'
import './ManualAddBookSection.css'
import { setError } from '../../redux/slices/errorSlice'
import Button from '../common/button/Button'
import Input from '../common/input/Input'

const ManualAddBookSection = ({ 'data-testid': testId }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [authors, setAuthors] = useState('')
  const books = useSelector(selectBook)

  const filterExistingBooks = () => {
    return books.find(
      (existedBook) =>
        existedBook.title.toLowerCase() === title.toLowerCase() &&
        existedBook.authors.toLowerCase() === authors.toLowerCase()
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim() && authors.trim()) {
      if (!filterExistingBooks()) {
        dispatch(addBook(createBook({ title, authors })))
      } else {
        dispatch(setError('The book is already in the List!'))
      }
    } else {
      dispatch(setError('Enter both Title and Author!'))
    }
    setTitle('')
    setAuthors('')
  }

  return (
    <section data-testid={testId}>
      <form onSubmit={handleSubmit} data-testid="manualAddBook_form">
        <p data-testid="manualAddBook_label">or</p>
        <h3 data-testid="manualAddBook_title">Add Book</h3>
        <div data-testid="manualAddBook_inputs_wrapper">
          <Input
            type="text"
            placeholder="Enter book title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            data-testid="manualAddBook_input_title"
          ></Input>
          <Input
            type="text"
            placeholder="Enter book author(s)..."
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
            data-testid="manualAddBook_input_author"
          ></Input>
        </div>
        <Button
          text="Add book"
          type="submit"
          data-testid="manualAddBook_submit_btn"
        ></Button>
      </form>
    </section>
  )
}

export default ManualAddBookSection
