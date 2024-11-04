import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { searchBookService } from '../../services/searchBookService'
import { selectBook } from './booksSlice'
import { setError } from './errorSlice'

// Helper function to filter books that are already in the store
const filterExistingBooks = (state, data) => {
  const existingBooks = selectBook(state)
  return data.filter(
    (foundBook) =>
      !existingBooks.some(
        (existingBook) =>
          existingBook.title.toLowerCase() === foundBook.title.toLowerCase() &&
          existingBook.authors.toLowerCase() === foundBook.authors.toLowerCase()
      )
  )
}

export const searchBooks = createAsyncThunk(
  'booksSearch/search',
  async (query, thunkAPI) => {
    try {
      const data = await searchBookService(query)
      const state = thunkAPI.getState()

      return filterExistingBooks(state, data)
    } catch (error) {
      thunkAPI.dispatch(setError(error))
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const searchBooksSlice = createSlice({
  name: 'booksSearch',
  initialState: {
    searchResults: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = []
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchBooks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(searchBooks.fulfilled, (state, action) => {
        state.isLoading = false
        state.searchResults = action.payload
      })
      .addCase(searchBooks.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { clearSearchResults } = searchBooksSlice.actions

export const selectSearchResults = (state) => state.booksSearch.searchResults
export const selectIsLoading = (state) => state.booksSearch.isLoading

export default searchBooksSlice.reducer
