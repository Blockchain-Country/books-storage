import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action) => {
      return action.payload
    },
    clearAlert: () => {
      return initialState
    },
  },
})

export const { setAlert, clearAlert } = alertSlice.actions

export const selectAlertSlice = (state) => state.alertMessage

export default alertSlice.reducer
