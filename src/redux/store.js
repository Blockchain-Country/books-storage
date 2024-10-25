import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './slices/BooksSlice'
import filterReducer from './slices/FilterSlice'

const createStore = (preloadedState) => {
  return configureStore({
    reducer: {
      books: booksReducer,
      filter: filterReducer,
    },
    preloadedState,
  })
}

export { createStore } // Export for test purposes

const store = createStore() // Default store without preloaded state for production
export default store
