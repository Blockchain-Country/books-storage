import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { searchBookOnGoogle } from '../../services/searchBookService'

export const searchBooks = createAsyncThunk(
  'bookSearch/searchBooks',
  async (query, { rejectWithValue }) => {
    try {
      const data = await searchBookOnGoogle(query)
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const bookSearchSlice = createSlice({
  name: 'bookSearch',
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

export const { clearSearchResults } = bookSearchSlice.actions

let lastSearchResults = []
export const selectSearchResults = (state) => {
  if (state.booksSearch?.searchResults === lastSearchResults) {
    return lastSearchResults
  }
  lastSearchResults = state.booksSearch?.searchResults || []
  return lastSearchResults
}

export const selectIsLoading = (state) => state.bookSearch?.isLoading || false
export const selectError = (state) => state.bookSearch?.error || null

export default bookSearchSlice.reducer
