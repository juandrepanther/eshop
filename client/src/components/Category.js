import { PureComponent } from 'react'
import {gql} from 'apollo-boost'
import { graphql } from 'react-apollo'


const getAllProducts = gql`
{
    category{
      products {
        category
        name
        description
        gallery
        prices{
          amount
          currency
        }
        inStock
        attributes{
          id
          name
          type
          items{
            id
            displayValue
          }
        }
      }
    }
  }
`

class Category extends PureComponent {
    displayProducts(){
        const data = this.props.data

        if (data.loading) {
            return <div>Loading Products...</div>
        } else {
            return console.log('Products uploaded')
        }
    }
    render() {
        
        return (
            <div>
                {this.displayProducts()}
            </div>
        )
    }
}


export default graphql(getAllProducts)(Category)
