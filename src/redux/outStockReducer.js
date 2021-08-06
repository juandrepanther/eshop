import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 isOut: false,
}

export const outStockReducer = createSlice({
 name: 'isOut',
 initialState,
 reducers: {
  showOutModal: (state, { payload }) => {
   if (payload === false) {
    state.isOut = false
   } else {
    state.isOut = !state.isOut
   }
  },
 },
})

export const { showOutModal } = outStockReducer.actions

export default outStockReducer.reducer
