import { useDispatch, useSelector } from 'react-redux'
import './BookFilter.css'
import {
  setTitleFilter,
  setAuthorsFilter,
  selectTitleFilter,
  selectAuthorsFilter,
  resetAllFilters,
} from '../../redux/slices/filterSlice'

const BookFilter = () => {
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
    <div className="app-block filter" data-testid="book_filter_component">
      <div className="filter-row">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Filter by title..."
            value={filterTitle}
            onChange={handleTitleFilter}
            data-testid="filterByTitle_input"
          ></input>
        </div>
        <div className="filter-group">
          <input
            type="text"
            placeholder="Filter by author(s)..."
            value={filterAuthors}
            onChange={handleAuthorsFilter}
            data-testid="filterByAuthors_input"
          ></input>
        </div>
        <button onClick={handleResetFilters} data-testid="clearAllFilters_btn">
          Clear All Filters
        </button>
      </div>
    </div>
  )
}

export default BookFilter
