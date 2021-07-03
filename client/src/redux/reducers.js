import {createStore} from 'redux'

//Redux Store Setup,
/*for initial state is responsible Reducer,
but for state storage is responsible createStore()*/
const initialState = {
    count: 42
  }
  
  function reducer(state = initialState, action) {
    switch (action.type) {
      case "INCREMENT":
        return {
          count: state.count + 1
        }
      case "DECREMENT":
        return {
          count: state.count -1
        }
        default:
          return state
    }
  }
  
  export const store = createStore(reducer)
  
  //Change Redux States by Actions, dispatch
  
  store.dispatch({ type: "INCREMENT"})
  store.dispatch({ type: "DECREMENT"})