import React, { Component } from 'react'
import {gql} from 'apollo-boost'
import { graphql } from 'react-apollo'


const getBooksQuerry = gql`
{
    category {
      name
      products {
        name
      }
    }
    }
`

class BookList extends Component {

    displayBooks(){
        const data = this.props.data

        if (data.loading) {
            return <div>Loading Books...</div>
        } else {
            return data.category.products.map(book=>{
                return <li key={book.id}>{book.name}</li>
            })
        }
    }
    render() {
        
        return (
            <div>
                <ul className="book-list">
                    {this.displayBooks()}
                </ul>
            </div>
        )
    }
}

export default graphql(getBooksQuerry)(BookList)
