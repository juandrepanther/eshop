import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 status: false,
}

export const showPdpReducer = createSlice({
 name: 'status',
 initialState,
 reducers: {
  showPdp: (state, { payload }) => {
   state.status = payload
  },
 },
})

// Action creators are generated for each case reducer function
export const { showPdp } = showPdpReducer.actions

export default showPdpReducer.reducer
