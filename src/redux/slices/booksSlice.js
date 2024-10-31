import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      const existingBook = state.find(
        (book) =>
          book.title.toLowerCase() === action.payload.title?.toLowerCase() &&
          book.authors.toLowerCase() === action.payload.authors?.toLowerCase()
      )
      if (!existingBook) {
        return [...state, action.payload]
      }
    },
    deleteBook: (state, action) => {
      return state.filter((book) => book.id !== action.payload)
    },
    toggleFavorite: (state, action) => {
      state.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite
        }
      })
    },
  },
})

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions

export const selectBook = (state) => state.books

export default booksSlice.reducer
