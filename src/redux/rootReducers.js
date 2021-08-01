import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 category: '',
}

export const rootReducers = createSlice({
 name: 'category',
 initialState,
 reducers: {
  addCategory: (state, { payload }) => {
   state.category = payload
  },
 },
})

// Action creators are generated for each case reducer function
export const { addCategory } = rootReducers.actions

export default rootReducers.reducer
