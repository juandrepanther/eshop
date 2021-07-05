import { Component } from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'

import Category from './components/Category'
import NavBar from './components/NavBar'
import './styles/App.css'
//Apollo imports
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
//Redux imports
import { Provider } from 'react-redux'
import { store } from './redux/store'

//Apollo Setup

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
})

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Provider store={store}>
            <ApolloProvider client={client}>
              <NavBar />
              <Category />
            </ApolloProvider>
          </Provider>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
