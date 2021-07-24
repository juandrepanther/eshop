import { PureComponent } from 'react'
import '../styles/CartOverlay.css'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import {
 incrementCounter,
 decrementCounter,
 deleteItem,
} from '../redux/itemsReducer'

class CartOverlay extends PureComponent {
 constructor(props) {
  super(props)
  this.state = {
   show: false,
   count: 1,
   item: [],
  }
  this.updateCounter = this.updateCounter.bind(this)
  this.getTotal = this.getTotal.bind(this)
  this.getPrice = this.getPrice.bind(this)
  this.deleteItem = this.deleteItem.bind(this)
 }

 getTotal() {
  const itemCurrencyArr = []
  const items = this.props.items

  items.map((item) =>
   item.data.prices.map((product) => itemCurrencyArr.push(product))
  )

  if (itemCurrencyArr.length) {
   const currentCurrency = this.props.currency
   const countersArr = this.props.items.map((item) => item.count)
   const res = []

   itemCurrencyArr
    .filter((item) => item.currency === currentCurrency)
    .map((item) => item.amount)
    .forEach((price, priceIndex) =>
     res.push(Math.floor(price * countersArr[priceIndex] * 100) / 100)
    )

   return res.reduce((a, b) => a + b).toFixed(2)
  } else return '0'
 }

 getPrice(item, currencyIndex) {
  const itemCurrencyArr = []
  item.data.prices.map((product) => itemCurrencyArr.push(product))
  return (
   <p
    key={Math.random()}
   >{`Price ${itemCurrencyArr[currencyIndex].currency} ${itemCurrencyArr[currencyIndex].amount}`}</p>
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

 deleteItem(itemIndex) {
  const { deleteItem } = this.props
  deleteItem({ itemIndex: itemIndex })
 }

 renderDecisions(item) {
  return (
   <>
    {Object.values(item.decisions).map((decision) => {
     return (
      <div key={Math.random()} className="cartoverlay-item-info-decisions-box">
       {decision}
      </div>
     )
    })}
   </>
  )
 }

 renderCounterUpdater(item) {
  return (
   <>
    <div className="cartoverlay-item-counter">
     <button onClick={() => this.updateCounter(item.id, 'increment')}>+</button>
     <div>{item.count}</div>
     <button onClick={() => this.updateCounter(item.id, 'decrement')}>-</button>
    </div>
   </>
  )
 }
 render() {
  const { items, currency } = this.props
  const currencyItem = ['USD', 'GBP', 'AUD', 'JPY', 'RUB']
  const currencyIndex = currencyItem.indexOf(currency)
  console.log(items)
  return (
   <div className="cartoverlay-backdrop">
    <div className="cartoverlay-container">
     <div className="cartoverlay-header">
      {items.length === 1
       ? `My Bag ${items.length} item`
       : `My Bag ${items.length} items`}
     </div>
     <div className="cartoverlay-items-wrapper">
      {items.map((item, itemIndex) => {
       return (
        <div key={item.id} className="cartoverlay-item">
         <div className="cartoverlay-item-info">
          <p>{item.data.name}</p>
          {this.getPrice(item, currencyIndex)}
          <div
           className="cartoverlay-item-info-decisions-box-wrapper"
           key={Math.random()}
          >
           {this.renderDecisions(item)}
          </div>
         </div>
         {this.renderCounterUpdater(item)}
         <div className="cartoverlay-item-image">
          <img alt="" src={item.data.gallery[0]} />
          <button
           onClick={() => this.deleteItem(itemIndex)}
           className="delete-item"
          >
           X
          </button>
         </div>
        </div>
       )
      })}
     </div>
     <div className="cartoverlay-footer-wrapper">
      <div className="cartoverlay-total-box">
       <div className="cartoverlay-total-text">Total</div>
       <div className="cartoverlay-total-price">{`${currency} ${this.getTotal()}`}</div>
      </div>
      <div className="cartoverlay-checkout-box">
       <NavLink to="/cart">
        <button className="cartoverlay-checkout-bagBtn">VIEW BAG</button>
       </NavLink>
       <button className="cartoverlay-checkout-checkBtn">CHECK OUT</button>
      </div>
     </div>
    </div>
   </div>
  )
 }
}

const mapStateToProps = (state) => ({
 items: state.items.items,
 currency: state.currency.currency,
})
const mapDispatchToProps = {
 incrementCounter,
 decrementCounter,
 deleteItem,
}

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay)
