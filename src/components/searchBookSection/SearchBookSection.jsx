import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchBookModal from '../modals/SearchBookModal'
import './SearchBookSection.css'
import {
  searchBooks,
  clearSearchResults,
  selectSearchResults,
  selectIsLoading,
} from '../../redux/slices/searchBookSlice'
import { setError } from '../../redux/slices/errorSlice'
import Button from '../common/button/Button'
import Input from '../common/input/Input'

const SearchBookSection = ({ 'data-testid': testId }) => {
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
    <section data-testid={testId}>
      <form onSubmit={handleBookSearchSubmit} data-testid="search_form">
        <h3 data-testid="search_form_title">Let's start!</h3>
        <div data-testid="search_input_wrapper">
          <Input
            type="text"
            placeholder="Global book search..."
            onChange={(e) => setBookToSearch(e.target.value)}
            value={bookToSearch}
            data-testid="search_form_input"
          ></Input>
        </div>
        <Button
          text="Search"
          type="submit"
          disabled={isLoading}
          data-testid="search_form_submit_btn"
        ></Button>
      </form>
      {isModalOpen && !isLoading && (
        <SearchBookModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          booksFoundList={searchResults}
        />
      )}
    </section>
  )
}

export default SearchBookSection
