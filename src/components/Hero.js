import { PureComponent } from 'react'
import { Route } from 'react-router-dom'
import Cards from './Cards'
import CartOverlay from './CartOverlay'
import MainCart from './MainCart'
import { connect } from 'react-redux'
import Card from './Card'

class Hero extends PureComponent {
 render() {
  const isActiveCartOverlay = this.props.showCartOverlay
  return (
   <>
    {isActiveCartOverlay && <CartOverlay />}
    <Route exact path='/' component={Cards} />
    <Route exact path='/:category' component={Cards} />
    <Route exact path='/cart' component={MainCart} />
    <Route exact path='/:category/:name' component={Card} />
   </>
  )
 }
}
const mapStateToProps = (state) => ({
 showCartOverlay: state.showCartOverlay.showCartOverlay,
})

export default connect(mapStateToProps)(Hero)