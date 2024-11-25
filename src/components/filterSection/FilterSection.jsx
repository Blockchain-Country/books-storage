import { useDispatch, useSelector } from 'react-redux'
import './FilterSection.css'
import {
  setTitleFilter,
  setAuthorsFilter,
  selectTitleFilter,
  selectAuthorsFilter,
  resetAllFilters,
} from '../../redux/slices/filterSlice'
import Button from '../common/button/Button'
import Input from '../common/input/Input'

const BookFilter = ({ 'data-testid': testId }) => {
  const dispatch = useDispatch()
  const filterTitle = useSelector(selectTitleFilter)
  const filterAuthors = useSelector(selectAuthorsFilter)

  const handleTitleFilter = (e) => {
    const value = e.target.value
    if (value.trim() || value === '') {
      dispatch(setTitleFilter(value))
    }
  }

  const handleAuthorsFilter = (e) => {
    const value = e.target.value
    if (value.trim() || value === '') {
      dispatch(setAuthorsFilter(value))
    }
  }

  const handleResetFilters = () => {
    if (filterTitle || filterAuthors) {
      dispatch(resetAllFilters())
    }
  }

  return (
    <section data-testid={testId}>
      <div data-testid="filter_container">
        <div data-testid="filter_title_wrapper">
          <Input
            type="text"
            placeholder="Filter by title..."
            value={filterTitle}
            onChange={handleTitleFilter}
            data-testid="filter_title_input"
          ></Input>
        </div>
        <div data-testid="filter_author_wrapper">
          <Input
            type="text"
            placeholder="Filter by author(s)..."
            value={filterAuthors}
            onChange={handleAuthorsFilter}
            data-testid="filter_author_input"
          ></Input>
        </div>
        <Button
          text="Clear All Filters"
          onClick={handleResetFilters}
          data-testid="filter_clear_btn"
        ></Button>
      </div>
    </section>
  )
}

export default BookFilter
