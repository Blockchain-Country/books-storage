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
  },
})

export const { addBook } = booksSlice.actions

export const selectBook = (state) => state.books

export default booksSlice.reducer
