import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

export const itemsReducer = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItems: (state, { payload }) => {
      state.items.push(payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { addItems } = itemsReducer.actions

export default itemsReducer.reducer
