import { useDispatch, useSelector } from 'react-redux'
import './BookFilter.css'
import {
  setTitleFilter,
  setAuthorFilter,
  selectTitleFilter,
  selectAuthorFilter,
  resetAllFilters,
} from '../../redux/slices/FilterSlice'

const BookFilter = () => {
  const dispatch = useDispatch()
  const filterTitle = useSelector(selectTitleFilter)
  const filterAuthor = useSelector(selectAuthorFilter)

  const handleTitleFilter = (e) => {
    dispatch(setTitleFilter(e.target.value))
  }

  const handleAuthorFilter = (e) => {
    dispatch(setAuthorFilter(e.target.value))
  }

  const handleResetFilters = () => {
    dispatch(resetAllFilters())
  }

  return (
    <div className="app-block filter" data-testid="book_filter_component">
      <div className="filter-row">
        <div className="filter-group">
          <input
            type="text"
            placeholder="filter by title..."
            value={filterTitle}
            onChange={handleTitleFilter}
            data-testid="filterByTitle_input"
          ></input>
        </div>
        <div className="filter-group">
          <input
            type="text"
            placeholder="filter by author..."
            value={filterAuthor}
            onChange={handleAuthorFilter}
            data-testid="filterByAuthor_input"
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
