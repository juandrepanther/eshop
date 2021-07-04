import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: ''
}

export const rootReducers = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    
    addValue: (state, action) => {
        state.value = action.payload
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, addValue } = rootReducers.actions

export default rootReducers.reducer