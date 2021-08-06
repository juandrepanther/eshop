import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 isAttr: false,
}

export const noAttrReducer = createSlice({
 name: 'isAttr',
 initialState,
 reducers: {
  showAttrModal: (state, { payload }) => {
   if (payload === false) {
    state.isAttr = false
   } else {
    state.isAttr = !state.isAttr
   }
  },
 },
})

export const { showAttrModal } = noAttrReducer.actions

export default noAttrReducer.reducer
