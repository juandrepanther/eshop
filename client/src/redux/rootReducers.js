import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  category: '',
}

export const rootReducers = createSlice({
  name: 'category',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.category = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { addCategory } = rootReducers.actions

export default rootReducers.reducer
