import { PureComponent } from 'react'
import { Route } from 'react-router-dom'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { compose } from 'redux'
import '../styles/Category.css'
import Cards from './Cards'
import MainCart from './MainCart'
import { showPdp } from '../redux/showPdpReducer'

const getAllProducts = gql`
  {
    category {
      products {
        category
        name
        description
        gallery
        prices {
          amount
          currency
        }
        inStock
        attributes {
          id
          name
          type
          items {
            id
            displayValue
          }
        }
      }
    }
  }
`

class Hero extends PureComponent {
  displayProducts(category) {
    const data = this.props.data
    let data_tech
    let data_clothes

    if (data.loading) {
      return null
    } else {
      data_tech = data.category.products.filter((i) => i.category === 'tech')
      data_clothes = data.category.products.filter(
        (i) => i.category === 'clothes'
      )
    }

    if (category === 'tech') return data_tech
    if (category === 'clothes') return data_clothes
  }
  correctStatePdp() {
    const { showPdp } = this.props
    showPdp(false)
  }

  render() {
    return (
      <div>
        <Route
          exact
          path="/clothes"
          component={(props) => (
            <Cards
              {...props}
              data={(this.correctStatePdp(), this.displayProducts('clothes'))}
            />
          )}
        />
        <Route
          exact
          path="/tech"
          component={(props) => (
            <Cards
              {...props}
              data={(this.correctStatePdp(), this.displayProducts('tech'))}
            />
          )}
        />

        <Route exact path="/cart" component={MainCart} />
      </div>
    )
  }
}

//REDUX CODES
const mapStateToProps = (state) => ({
  category: state.category,
})
const mapDispatchToProps = { showPdp }
export default compose(
  graphql(getAllProducts),
  connect(mapStateToProps, mapDispatchToProps)
)(Hero)
