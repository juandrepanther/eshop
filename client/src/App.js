import {Component} from 'react'
import BookList from './components/BookList'
import './styles/App.css'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'

//Apollo Setup

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

class App extends Component {
  
  render() {
    
    return (
      <ApolloProvider client={client}>
      <div className='main'>
        <h5 className="header">Hello Class Component</h5>
        <BookList />
      </div>
      </ApolloProvider >
    )
  }
}

export default App;
