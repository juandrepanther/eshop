import { PureComponent } from 'react'
import { Route } from 'react-router-dom'
import Cards from './Cards'
import MainCart from './MainCart'
class Hero extends PureComponent {
 render() {
  return (
   <>
    <Route exact path="/" component={Cards} />
    <Route path="/:category" component={Cards} />
    <Route path="/cart" component={MainCart} />
   </>
  )
 }
}

export default Hero
