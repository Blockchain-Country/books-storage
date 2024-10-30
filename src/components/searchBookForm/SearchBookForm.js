import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchBookForm from '../modals/SearchBookModal'
import './SearchBookForm.css'
import {
  searchBooks,
  clearSearchResults,
  selectSearchResults,
} from '../../redux/slices/searchBookSlice'

const BookFormAPI = () => {
  const dispatch = useDispatch()
  const [bookToSearch, setBookToSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const searchResults = useSelector(selectSearchResults)

  const handleBookSearchSubmit = (e) => {
    e.preventDefault()
    if (bookToSearch.trim() !== '') {
      dispatch(searchBooks(bookToSearch))
      setIsModalOpen(true)
    }
    setBookToSearch('')
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    dispatch(clearSearchResults())
    setBookToSearch('')
  }

  return (
    <div
      className="app-block book-form-api"
      data-testid="bookFormAPI_component"
      onSubmit={handleBookSearchSubmit}
    >
      <h2>Let's start!</h2>
      <form className="book-form">
        <div>
          <input
            type="text"
            placeholder="Global book search..."
            onChange={(e) => setBookToSearch(e.target.value)}
            value={bookToSearch}
          ></input>
        </div>
        <button type="submit" data-testid="bookSearchSubmit_btn">
          Search
        </button>
      </form>
      {isModalOpen && (
        <SearchBookForm
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          booksFoundList={searchResults}
        />
      )}
    </div>
  )
}

export default BookFormAPI
