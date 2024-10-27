import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './slices/BooksSlice'
import filterReducer from './slices/FilterSlice'
import searchBookReducer from './slices/searchBookSlice'

const createStore = (preloadedState) => {
  return configureStore({
    reducer: {
      books: booksReducer,
      filter: filterReducer,
      booksSearch: searchBookReducer,
    },
    preloadedState,
  })
}

export { createStore } // Export for test purposes

const store = createStore() // Default store without preloaded state for production
export default store
