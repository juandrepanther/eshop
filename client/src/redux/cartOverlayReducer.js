import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showCartOverlay: false,
}

export const cartOverlayReducer = createSlice({
  name: 'showCartOverlay',
  initialState,
  reducers: {
    showCartOverlay: (state, { payload }) => {
      state.showCartOverlay = !state.showCartOverlay || payload
    },
  },
})

export const { showCartOverlay } = cartOverlayReducer.actions

export default cartOverlayReducer.reducer
