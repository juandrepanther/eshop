import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

const initialState = {
 items: [],
}

export const itemsReducer = createSlice({
 name: 'items',
 initialState,
 reducers: {
  addItems: (state, { payload }) => {
   const { decisions, data } = payload
   //from payload data.name and from item - item.data.name
   let findDublicate = []
   for (const item of state.items)
    JSON.stringify(item.decisions + item.data.name) ===
    JSON.stringify(decisions + data.name)
     ? findDublicate.push(true)
     : findDublicate.push(false)
   const noExist = findDublicate.findIndex((item) => item === true)
   if (noExist === -1) {
    state.items.push(payload)
   } else {
    toast.warn(
     'You can`t add this price with the same attribute! Go to Basket and multiply them!',
     {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 4000,
     }
    )
   }
   findDublicate = []
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
export const {
 addItems,
 incrementCounter,
 decrementCounter,
 deleteItem,
} = itemsReducer.actions

export default itemsReducer.reducer
