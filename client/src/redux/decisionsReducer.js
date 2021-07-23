import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 decisions: [],
}

export const decisionsReducer = createSlice({
 name: 'decisions',
 initialState,
 reducers: {
  addDecision: (state, { payload }) => {
   state.decisions = { ...state.decisions, ...payload }
  },
  deleteDecision: (state) => {
   state.decisions = []
  },
 },
})

// Action creators are generated for each case reducer function
export const { addDecision, deleteDecision } = decisionsReducer.actions

export default decisionsReducer.reducer
