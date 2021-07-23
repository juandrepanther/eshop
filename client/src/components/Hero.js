import { PureComponent } from 'react'
import { Route } from 'react-router-dom'
import '../styles/Category.css'
import Cards from './Cards'
import MainCart from './MainCart'
class Hero extends PureComponent {
 render() {
  return (
   <>
    <Route exact path="/" component={Cards} />
    <Route exact path="/:category" component={Cards} />
    <Route exact path="/cart" component={MainCart} />
   </>
  )
 }
}

export default Hero
