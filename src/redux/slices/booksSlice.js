import { createSlice } from '@reduxjs/toolkit'
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore'
import { auth, db } from '../../api/services/firebaseConfig'
import { setError } from './errorSlice'

const initialState = []

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action) => {
      return [...action.payload]
    },
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
      return state.map((book) =>
        book.id === action.payload
          ? { ...book, isFavorite: !book.isFavorite }
          : book
      )
    },
  },
})

export const { setBooks, addBook, deleteBook, toggleFavorite } =
  booksSlice.actions

export const syncLoadBook = () => async (dispatch) => {
  try {
    // Skip Firebase operations in test environment
    if (process.env.NODE_ENV === 'test') {
      dispatch(setBooks([])) // Mock empty books for tests
      return
    }

    const userId = auth.currentUser?.uid
    if (userId) {
      const booksCollectionRef = collection(db, `users/${userId}/books`)
      const querySnapshot = await getDocs(booksCollectionRef)

      const books = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))

      dispatch(setBooks(books))
    } else {
      dispatch(setBooks([]))
    }
  } catch (error) {
    console.error('Error loading books from Firebase:', error.message)
    dispatch(setError('Failed to load books! Please try again!'))
  }
}

export const syncAddBook = (book) => async (dispatch) => {
  try {
    // Skip Firebase operations in test environment
    if (process.env.NODE_ENV === 'test') {
      dispatch(addBook(book)) // Directly dispatch addBook for tests
      return
    }

    const userId = auth.currentUser?.uid
    if (userId) {
      const bookRef = doc(db, `users/${userId}/books/${book.id}`)
      await setDoc(bookRef, book)
    }

    dispatch(addBook(book))
  } catch (error) {
    console.error('Error adding book to Firebase:', error.message)
    dispatch(setError('Failed to add book! Please try again!'))
  }
}

export const syncDeleteBook = (id) => async (dispatch) => {
  try {
    // Skip Firebase operations in test environment
    if (process.env.NODE_ENV === 'test') {
      dispatch(deleteBook(id)) // Directly dispatch deleteBook for tests
      return
    }

    const userId = auth.currentUser?.uid
    if (userId) {
      const bookRef = doc(db, `users/${userId}/books/${id}`)
      await deleteDoc(bookRef)
    }
    dispatch(deleteBook(id))
  } catch (error) {
    console.error('Error deleting book from Firebase:', error.message)
    dispatch(setError('Failed to delete book! Please try again!'))
  }
}

export const syncToggleFavorite = (id) => async (dispatch) => {
  try {
    // Skip Firebase operations in test environment
    if (process.env.NODE_ENV === 'test') {
      dispatch(toggleFavorite(id)) // Directly dispatch toggleFavorite for tests
      return
    }

    const userId = auth.currentUser?.uid
    if (userId) {
      const bookRef = doc(db, `users/${userId}/books/${id}`)
      const bookDoc = await getDoc(bookRef)
      const book = bookDoc.data()
      const revertedToggle = { ...book, isFavorite: !book.isFavorite }
      await setDoc(bookRef, revertedToggle)
    }
    dispatch(toggleFavorite(id))
  } catch (error) {
    console.error('Error toggling favorite in Firebase:', error.message)
    dispatch(setError('Failed to toggle favorite! Please try again.'))
  }
}

export const selectBook = (state) => state.books

export default booksSlice.reducer
