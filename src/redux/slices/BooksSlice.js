import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.push(action.payload)
    },
  },
})

export const { addBook } = booksSlice.actions

export const selectBook = (state) => state.payload

export default booksSlice.reducer
