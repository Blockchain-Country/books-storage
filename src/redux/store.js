import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './slices/BooksSlice'

const createStore = (preloadedState) => {
  return configureStore({
    reducer: {
      books: booksReducer,
    },
    preloadedState,
  })
}

export { createStore } // Export for test purposes

const store = createStore() // Default store without preloaded state for production
export default store
