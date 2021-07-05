import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currency: 'USD',
  
}

export const currencyReducer = createSlice(


{
  name: 'currency',
  initialState,
  reducers: {
    changeCurrency: (state, {payload}) => {
      state.currency = payload
    },
  }
})

// Action creators are generated for each case reducer function
export const {changeCurrency } = currencyReducer.actions

export default currencyReducer.reducer
