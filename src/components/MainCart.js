import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/MainCart.css'
import { incrementCounter, decrementCounter } from '../redux/itemsReducer'
import ImageSlider from './imageSlider'
import attributesBoxes from '../utils/attributesBoxes'
//utility textLiner - it can add space line. Get price util.
import descriptionTextLiner from '../utils/descriptionTextLiner'
import getPrice from '../utils/getPrice'

class MainCart extends Component {
 constructor(props) {
  super(props)
  this.state = {
   show: false,
   count: 1,
   item: [],
   imageIndex: 0,
  }
  this.updateCounter = this.updateCounter.bind(this)
 }

 updateCounter(itemId, task) {
  const { incrementCounter, decrementCounter } = this.props
  if (task === 'increment') {
   incrementCounter({
    id: itemId,
   })
  } else if (task === 'decrement') {
   decrementCounter({
    id: itemId,
   })
  }
 }

 renderItems() {
  const { items, currency } = this.props
  return (
   <>
    {items.map((item, itemIndex) => {
     return (
      <div className='cart-item' key={item.id.toString()}>
       <div className='cart-item-info' key={Math.random()}>
        <div className='cart-item-info-text-wrap' key={Math.random()}>
         {descriptionTextLiner(item.data.name)}
        </div>
        <h2>{getPrice(item, currency)}</h2>
        <div
         className='cart-item-info-decisions-box-wrapper'
         key={Math.random()}>
         {attributesBoxes(item)}
        </div>
       </div>
       <div className='cart-item-counter' key={Math.random()}>
        <button
         onClick={() => this.updateCounter(item.id, 'increment')}
         key={Math.random()}>
         +
        </button>
        <div key={Math.random()}>{item.count}</div>
        <button
         onClick={() => this.updateCounter(item.id, 'decrement')}
         key={Math.random()}>
         -
        </button>
       </div>
       <ImageSlider item={item} itemIndex={itemIndex} />
      </div>
     )
    })}
   </>
  )
 }

 render() {
  return (
   <div className='cart-container'>
    <div className='cart-wrapper'>
     <h5>CART</h5>
     {this.renderItems()}
    </div>
   </div>
  )
 }
}

const mapStateToProps = (state) => ({
 items: state.items.items,
 currency: state.currency.currency,
})
const mapDispatchToProps = { incrementCounter, decrementCounter }
export default connect(mapStateToProps, mapDispatchToProps)(MainCart)
