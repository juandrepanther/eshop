import { configureStore } from '@reduxjs/toolkit'
import rootReducers from './rootReducers'
import currencyReducer from './currencyReducer'
import itemsReducer from './itemsReducer'
import decisionsReducer from './decisionsReducer'
import cartOverlayReducer from './cartOverlayReducer'
import showCurrencySwitcher from './CurrSwitchReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

export const store = configureStore(
 {
  reducer: {
   category: rootReducers,
   currency: currencyReducer,
   items: itemsReducer,
   decisions: decisionsReducer,
   isOverlay: cartOverlayReducer,
   isCurrencySwitcher: showCurrencySwitcher,
  },
 },
 composeWithDevTools()
)
