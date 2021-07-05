import { configureStore } from '@reduxjs/toolkit'
import rootReducers from './rootReducers'
import currencyReducer from './currencyReducer'

export const store = configureStore({
  reducer: {
    category: rootReducers,
    currency: currencyReducer,
    
  },
})
