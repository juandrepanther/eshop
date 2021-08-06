import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 isCurrencySwitcher: false,
}

export const CurrSwitchReducer = createSlice({
 name: 'CurrSwitchReducer',
 initialState,
 reducers: {
  showCurrencySwitcher: (state, { payload }) => {
   if (payload === false) {
    state.isCurrencySwitcher = false
   } else {
    state.isCurrencySwitcher = !state.isCurrencySwitcher
   }
  },
 },
})

// Action creators are generated for each case reducer function
export const { showCurrencySwitcher } = CurrSwitchReducer.actions

export default CurrSwitchReducer.reducer
