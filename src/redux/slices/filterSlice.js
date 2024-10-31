import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  title: '',
  authors: '',
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      return { ...state, title: action.payload }
    },
    setAuthorsFilter: (state, action) => {
      return { ...state, authors: action.payload }
    },
    resetAllFilters: () => {
      return initialState
    },
  },
})

export const { setTitleFilter, setAuthorsFilter, resetAllFilters } =
  filterSlice.actions

export const selectTitleFilter = (state) => state.filter.title
export const selectAuthorsFilter = (state) => state.filter.authors

export default filterSlice.reducer
