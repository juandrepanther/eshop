import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/MainCart.css'
import { incrementCounter, decrementCounter } from '../redux/itemsReducer'
import ImageSlider from './imageSlider'

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
  this.getPrice = this.getPrice.bind(this)
 }

 getPrice(item, currencyIndex) {
  const itemCurrencyArr = []
  item.data.prices.map((product) => itemCurrencyArr.push(product))
  return (
   <p>{`Price ${itemCurrencyArr[currencyIndex].currency} ${itemCurrencyArr[currencyIndex].amount}`}</p>
  )
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
  const items = this.props.items
  const currency = this.props.currency
  const currencyItem = ['USD', 'GBP', 'AUD', 'JPY', 'RUB']
  const currencyIndex = currencyItem.indexOf(currency)
  return (
   <>
    {items.map((item, itemIndex) => {
     return (
      <div className="cart-item" key={item.id.toString()}>
       <div className="cart-item-info" key={Math.random()}>
        <p key={Math.random()}>{item.data.name}</p>
        {this.getPrice(item, currencyIndex)}
        <div
         className="cart-item-info-decisions-box-wrapper"
         key={Math.random()}
        >
         {Object.values(item.decisions).map((decision) => {
          return (
           <div className="cart-item-info-decisions-box" key={Math.random()}>
            {decision}
           </div>
          )
         })}
        </div>
       </div>
       <div className="cart-item-counter" key={Math.random()}>
        <button
         onClick={() => this.updateCounter(item.id, 'increment')}
         key={Math.random()}
        >
         +
        </button>
        <div key={Math.random()}>{item.count}</div>
        <button
         onClick={() => this.updateCounter(item.id, 'decrement')}
         key={Math.random()}
        >
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
   <div className="cart-container">
    <div className="cart-wrapper">
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
