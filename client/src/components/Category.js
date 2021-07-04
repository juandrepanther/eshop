import { PureComponent } from 'react'
import {gql} from 'apollo-boost'
import { graphql } from 'react-apollo'
import {connect} from 'react-redux'
import {compose} from 'redux'
import '../styles/Category.css'
import Card from './Card'


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
            return (
                <div className='products-container'>
                    <div className='products-card-wrapper'>
                        <Card data={this.props.data.category.products} />
                    </div>
                </div>
            )
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

//REDUX CODES
const mapStateToProps = state => ({
  category: state.category
})

export default compose(
  graphql(getAllProducts),
  connect(mapStateToProps)
)(Category)
