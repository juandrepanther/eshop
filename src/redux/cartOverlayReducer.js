import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 isOverlay: false,
}

export const cartOverlayReducer = createSlice({
 name: 'isOverlay',
 initialState,
 reducers: {
  showCartOverlay: (state, { payload }) => {
   if (payload === false) {
    state.isOverlay = false
   } else {
    state.isOverlay = !state.isOverlay
   }
  },
 },
})

export const { showCartOverlay } = cartOverlayReducer.actions

export default cartOverlayReducer.reducer
