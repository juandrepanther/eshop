import { Component } from 'react'
import '../styles/CartOverlay.css'

import { connect } from 'react-redux'
import { incrementCounter, decrementCounter } from '../redux/itemsReducer'

class CartOverlay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      count: 1,
      item: [],
    }
    this.showCart = this.showCart.bind(this)
    this.updateCounter = this.updateCounter.bind(this)
    this.getTotal = this.getTotal.bind(this)
    this.getPrice = this.getPrice.bind(this)
    this.showCartComponent = this.showCartComponent.bind(this)
  }

  showCart() {
    this.setState({ ...this.state, show: true })
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
    const itemCurrencyArr = [] //fullfiled and updated array
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

  showCartComponent() {
    const items = this.props.items
    const currency = this.props.currency //example USD 'string'
    const currencyItem = ['USD', 'GBP', 'AUD', 'JPY', 'RUB']
    const currencyIndex = currencyItem.indexOf(currency)

    return (
      <div className="cart-container">
        {items.map(() => {
          return (
            <div className="cart-wrapper">
              <h5>CART</h5>
              {items.map((item) => {
                return (
                  <>
                    <div className="cartoverlay-item" key={item.id}>
                      <div className="cartoverlay-item-info">
                        <p>{item.data.name}</p>
                        {this.getPrice(item, currencyIndex)}
                        <div className="cartoverlay-item-info-decisions-box-wrapper">
                          {Object.values(item.decisions).map((decision) => {
                            return (
                              <>
                                <div className="cartoverlay-item-info-decisions-box">
                                  {decision}
                                </div>
                              </>
                            )
                          })}
                        </div>
                      </div>
                      <div className="cartoverlay-item-counter">
                        <button
                          onClick={() =>
                            this.updateCounter(item.id, 'increment')
                          }
                        >
                          +
                        </button>
                        <div>{item.count}</div>
                        <button
                          onClick={() =>
                            this.updateCounter(item.id, 'decrement')
                          }
                        >
                          -
                        </button>
                      </div>
                      <div className="cartoverlay-item-image">
                        <img alt="" src={item.data.gallery[0]} />
                      </div>
                    </div>
                  </>
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    const items = this.props.items
    const currency = this.props.currency //example USD 'string'
    const currencyItem = ['USD', 'GBP', 'AUD', 'JPY', 'RUB']
    const currencyIndex = currencyItem.indexOf(currency)

    return (
      <>
        <div className="cartoverlay-container">
          <div className="cartoverlay-header">
            {items.length === 1
              ? `My Bag ${items.length} item`
              : `My Bag ${items.length} items`}
          </div>
          <div className="cartoverlay-items-wrapper">
            {items.map((item) => {
              return (
                <>
                  <div key={item.id} className="cartoverlay-item">
                    <div className="cartoverlay-item-info">
                      <p>{item.data.name}</p>
                      {this.getPrice(item, currencyIndex)}
                      <div className="cartoverlay-item-info-decisions-box-wrapper">
                        {Object.values(item.decisions).map((decision) => {
                          return (
                            <>
                              <div
                                key={item.id}
                                className="cartoverlay-item-info-decisions-box"
                              >
                                {decision}
                              </div>
                            </>
                          )
                        })}
                      </div>
                    </div>
                    <div className="cartoverlay-item-counter">
                      <button
                        onClick={() => this.updateCounter(item.id, 'increment')}
                      >
                        +
                      </button>
                      <div>{item.count}</div>
                      <button
                        onClick={() => this.updateCounter(item.id, 'decrement')}
                      >
                        -
                      </button>
                    </div>
                    <div className="cartoverlay-item-image">
                      <img alt="" src={item.data.gallery[0]} />
                    </div>
                  </div>
                </>
              )
            })}
          </div>
          <div className="cartoverlay-total-box">
            <div className="cartoverlay-total-text">Total</div>
            <div className="cartoverlay-total-price">{`${
              this.props.currency
            } ${this.getTotal()}`}</div>
          </div>
          <div className="cartoverlay-checkout-box">
            <button
              className="cartoverlay-checkout-bagBtn"
              onClick={() => this.showCart()}
            >
              VIEW BAG
            </button>
            <button className="cartoverlay-checkout-checkBtn">CHECK OUT</button>
          </div>
        </div>
        {this.state.show && this.showCartComponent()}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  items: state.items.items,
  currency: state.currency.currency,
})
const mapDispatchToProps = { incrementCounter, decrementCounter }
//here will be deleteItems reducer later on
//const mapDispatchToProps = { changeCurrency }

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay)
