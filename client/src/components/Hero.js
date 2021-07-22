import { PureComponent } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import '../styles/Category.css'
import Cards from './Cards'
import MainCart from './MainCart'
import { showPdp } from '../redux/showPdpReducer'

class Hero extends PureComponent {
  render() {
    return (
      <div>
        <Route exact path='/' component={Cards} />
        <Route exact path='/tech' component={Cards} />
        <Route exact path='/clothes' component={Cards} />
        <Route exact path='/cart' component={MainCart} />
      </div>
    )
  }
}

//REDUX CODES
const mapStateToProps = (state) => ({
  category: state.category,
})
const mapDispatchToProps = { showPdp }

export default connect(mapStateToProps, mapDispatchToProps)(Hero)
