import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RiLoader2Line } from 'react-icons/ri'
import SearchBookModal from '../modals/SearchBookModal'
import './SearchBookForm.css'
import {
  searchBooks,
  clearSearchResults,
  selectSearchResults,
  selectIsLoading,
} from '../../redux/slices/searchBookSlice'
import { setError } from '../../redux/slices/errorSlice'

const BookFormAPI = () => {
  const dispatch = useDispatch()
  const [bookToSearch, setBookToSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isLoading = useSelector(selectIsLoading)
  const searchResults = useSelector(selectSearchResults)

  const handleBookSearchSubmit = (e) => {
    e.preventDefault()
    if (bookToSearch.trim()) {
      dispatch(searchBooks(bookToSearch))
      setIsModalOpen(true)
    } else {
      dispatch(setError('Enter Book Name to Search!'))
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
            placeholder="Global books search..."
            onChange={(e) => setBookToSearch(e.target.value)}
            value={bookToSearch}
          ></input>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          data-testid="bookSearchSubmit_btn"
        >
          {isLoading ? <RiLoader2Line className="spinner" /> : 'Search'}
        </button>
      </form>
      {isModalOpen && !isLoading && (
        <SearchBookModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          booksFoundList={searchResults}
        />
      )}
    </div>
  )
}

export default BookFormAPI
