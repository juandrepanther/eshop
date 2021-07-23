import { PureComponent } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import '../styles/Category.css'
import Cards from './Cards'
import MainCart from './MainCart'
import { showPdp } from '../redux/showPdpReducer'

//GraphQl querry and imports
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { Fragment } from 'react'

const GET_CATEGORIES = gql`
  {
    category {
      products {
        category
      }
    }
  }
`

class Hero extends PureComponent {
  render() {
    return (
      <>
        <Route exact path="/" component={Cards} />
        <Query query={GET_CATEGORIES}>
          {({ loading, error }) => {
            if (loading) return <h4>Loading...</h4>
            if (error) console.log(error)
            return (
              <>
                <Route exact path="/:category" component={Cards} />
              </>
            )
          }}
        </Query>
        <Route exact path="/cart" component={MainCart} />
      </>
    )
  }
}

//REDUX CODES
const mapStateToProps = (state) => ({
  category: state.category,
})
const mapDispatchToProps = { showPdp }

export default connect(mapStateToProps, mapDispatchToProps)(Hero)
