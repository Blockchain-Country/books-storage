import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './slices/booksSlice'
import filterReducer from './slices/filterSlice'
import searchBookReducer from './slices/searchBookSlice'
import randomBooksReducer from './slices/randomBooksSlice'
import errorReducer from './slices/errorSlice'

const createStore = (preloadedState) => {
  return configureStore({
    reducer: {
      books: booksReducer,
      filter: filterReducer,
      booksSearch: searchBookReducer,
      randomBooks: randomBooksReducer,
      errorMessage: errorReducer,
    },
    preloadedState,
  })
}

export { createStore } // Export for test purposes

const store = createStore() // Default store without preloaded state for production
export default store
