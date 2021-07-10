import { configureStore } from '@reduxjs/toolkit'
import rootReducers from './rootReducers'
import currencyReducer from './currencyReducer'
import itemsReducer from './itemsReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

export const store = configureStore(
  {
    reducer: {
      category: rootReducers,
      currency: currencyReducer,
      items: itemsReducer,
    },
  },
  composeWithDevTools()
)
