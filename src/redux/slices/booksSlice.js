import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      //   state.push(action.payload)
      const existingBookTitle = state.find(
        (book) => book.title === action.payload.title
      )
      const existingBookAuthor = state.find(
        (book) => book.author === action.payload.author
      )
      if (!existingBookTitle && !existingBookAuthor) {
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
