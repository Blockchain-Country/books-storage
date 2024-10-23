import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      //   state.push(action.payload)
      return [...state, action.payload]
    },
    deleteBook: (state, action) => {
      return state.filter((book) => book.id !== action.payload)
    },
  },
})

export const { addBook, deleteBook } = booksSlice.actions

export const selectBook = (state) => state.books

export default booksSlice.reducer
