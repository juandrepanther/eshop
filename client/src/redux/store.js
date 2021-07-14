import { configureStore } from '@reduxjs/toolkit'
import rootReducers from './rootReducers'
import currencyReducer from './currencyReducer'
import itemsReducer from './itemsReducer'
import showPdpReducer from './showPdpReducer'
import decisionsReducer from './decisionsReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

export const store = configureStore(
  {
    reducer: {
      category: rootReducers,
      currency: currencyReducer,
      items: itemsReducer,
      status: showPdpReducer,
      decisions: decisionsReducer,
    },
  },
  composeWithDevTools()
)
