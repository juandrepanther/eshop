import {Component} from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Category from './components/Category'
import NavBar from './components/NavBar'
import './styles/App.css'
//Apollo imports
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
//Redux imports
import {Provider} from 'react-redux'
import {store} from './redux/store'

//Apollo Setup

const client = new ApolloClient({
  uri: 'http://localhost:4000/'
})

//Class main render
class App extends Component {
  
  render() {
    
    return (
      <BrowserRouter>
        <Provider store={store}>
        <ApolloProvider client={client}>
          <NavBar />
          <Switch>
            <Route exact path='/clothes' component={Category}/>
            <Route exact path='/tech' component={Category}/>
          </Switch>
        </ApolloProvider>
        </Provider>
      </BrowserRouter>
    )
  }
}

export default App;
