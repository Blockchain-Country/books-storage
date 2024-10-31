import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { searchBookOnGoogle } from '../../services/searchBookService'
import { selectBook } from './booksSlice'

export const searchBooks = createAsyncThunk(
  'booksSearch/searchBooks',
  async (query, { getState, rejectWithValue }) => {
    try {
      const data = await searchBookOnGoogle(query)

      const state = getState()
      const existingBooks = selectBook(state)

      const filteredBooks = data.filter(
        (foundBook) =>
          !existingBooks.some(
            (existingBook) =>
              existingBook.title.toLowerCase() ===
                foundBook.title.toLowerCase() &&
              existingBook.authors.toLowerCase() ===
                foundBook.authors.toLowerCase()
          )
      )

      return filteredBooks
    } catch (error) {
      return rejectWithValue(error.message)
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
        state.error = null
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

let lastSearchResults = []

export const selectSearchResults = (state) => {
  if (state.booksSearch.searchResults === lastSearchResults) {
    return lastSearchResults
  }
  lastSearchResults = state.booksSearch.searchResults
  return lastSearchResults
}

export const selectIsLoading = (state) => state.booksSearch?.isLoading || false
export const selectError = (state) => state.booksSearch?.error || null

export default searchBooksSlice.reducer
