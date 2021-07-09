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
      console.log('Added')
    },
    incrementCounter: (state, action) => {
      const objChange = state.items.filter(
        (item) => item.id === action.payload.id
      )
      console.log(objChange)

      // return {
      //   ...state,
      //   items: state.items.map((item) => {
      //     if (item.id === action.payload.id) {
      //       item.count = 30
      //       return item
      //     }
      //   }),
      // }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addItems, incrementCounter } = itemsReducer.actions

export default itemsReducer.reducer
