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

  deleteItem: (state, action) => {
   const { itemIndex } = action.payload
   state.items.splice(itemIndex, 1)
  },

  incrementCounter: (state, action) => {
   const { id } = action.payload

   return {
    ...state.items,
    items: state.items.map((item) =>
     item.id === id ? { ...item, count: item.count + 1 } : item
    ),
   }
  },

  decrementCounter: (state, action) => {
   const { id } = action.payload

   return {
    ...state.items,
    items: state.items.map((item) => {
     if (item.count >= 2) {
      return item.id === id ? { ...item, count: item.count - 1 } : item
     } else {
      return item
     }
    }),
   }
  },
 },
})

// Action creators are generated for each case reducer function
export const { addItems, incrementCounter, decrementCounter, deleteItem } =
 itemsReducer.actions

export default itemsReducer.reducer
