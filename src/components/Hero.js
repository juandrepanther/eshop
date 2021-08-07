import { PureComponent } from 'react'
import { Route } from 'react-router-dom'
import Cards from './Cards'
import MainCart from './MainCart'
import Card from './Card'
class Hero extends PureComponent {
 render() {
  return (
   <>
    <Route exact path="/" component={Cards} />
    <Route exact path="/:category" component={Cards} />
    <Route exact path="/cart" component={MainCart} />
    <Route exact path="/:category/:name" component={Card} />
   </>
  )
 }
}

export default Hero
