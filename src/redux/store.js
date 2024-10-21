import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './slices/BooksSlice'

const store = configureStore({
  reducer: {
    books: booksReducer,
  },
})

export default store
