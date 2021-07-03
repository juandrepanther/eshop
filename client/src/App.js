import {Component} from 'react'
import BookList from './components/BookList'
import './styles/App.css'
//Apollo imports
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
//Redux imports
import {Provider} from 'react-redux'
import {store} from './redux/reducers'

//Apollo Setup

const client = new ApolloClient({
  uri: 'http://localhost:4000/'
})



//Class main render
class App extends Component {
  
  render() {
    
    return (
      <Provider store={store}>
      <ApolloProvider client={client}>
      <div className='main'>
        <h5 className="header">Hello Class Component</h5>
        <BookList />
      </div>
      </ApolloProvider>
      </Provider>
    )
  }
}

export default App;
