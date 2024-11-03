import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { searchBookService } from '../../services/searchBookService'
import { selectBook } from './booksSlice'
import { setError } from './errorSlice'

export const searchBooks = createAsyncThunk(
  'booksSearch/search',
  async (query, thunkAPI) => {
    try {
      const data = await searchBookService(query)

      const state = thunkAPI.getState()
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
      thunkAPI.dispatch(setError(error.message))
      return thunkAPI.rejectWithValue(error.message)
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
        // state.error = null
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

export const selectIsLoading = (state) => state.booksSearch?.isLoading || false
// export const selectError = (state) => state.booksSearch?.error || null

export default searchBooksSlice.reducer
