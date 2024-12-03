import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { randomBookService } from '../../api/services/randomBookService'
import { setError } from './errorSlice'

export const getRandomBooks = createAsyncThunk(
  'randomBooks/fetch',
  async (_, thunkAPI) => {
    try {
      return await randomBookService()
    } catch (error) {
      const sanitizedError = error?.message || 'Failed to fetch random books'
      thunkAPI.dispatch(setError(sanitizedError))
      return thunkAPI.rejectWithValue(sanitizedError)
    }
  }
)

const randomBooksSlice = createSlice({
  name: 'randomBooks',
  initialState: {
    randomBooks: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearRandomBooks: (state) => {
      state.randomBooks = []
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRandomBooks.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getRandomBooks.fulfilled, (state, action) => {
        state.isLoading = false
        state.randomBooks = action.payload
      })
      .addCase(getRandomBooks.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { clearRandomBooks } = randomBooksSlice.actions

export const selectRandomBooks = (state) => state.randomBooks.randomBooks
export const selectIsLoading = (state) => state.randomBooks.isLoading

export default randomBooksSlice.reducer
