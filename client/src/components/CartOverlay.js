import { PureComponent } from 'react'
import '../styles/CartOverlay.css'

import { connect } from 'react-redux'
import { incrementCounter } from '../redux/itemsReducer'

class CartOverlay extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      count: 1,
    }
    this.showCart = this.showCart.bind(this)
    this.updateCounter = this.updateCounter.bind(this)
  }

  showCart() {
    this.setState({ ...this.state, show: true })
  }
  updateCounter(itemId) {
    const { incrementCounter } = this.props
    incrementCounter({
      id: itemId,
      number: 5,
    })
    console.log(itemId)
  }
  render() {
    const items = this.props.items
    const currency = this.props.currency //example USD 'string'
    const currencyItem = ['USD', 'GBP', 'AUD', 'JPY', 'RUB']
    const currencyIndex = currencyItem.indexOf(currency)
    const itemCurrencyArr = []

    function Cart() {
      return (
        <div className="cart-container">
          <div className="cart-wrapper">
            <h5>CART</h5>
            {items.map((item, index) => {
              return (
                <>
                  <div className="cartoverlay-item" key={index}>
                    <div className="cartoverlay-item-info">
                      <p>{item.data.name}</p>
                      {item.data.prices.map((product) => {
                        itemCurrencyArr.push(product)
                      })}
                      <p>{`Price ${itemCurrencyArr[currencyIndex].currency} ${itemCurrencyArr[currencyIndex].amount}`}</p>
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
                    <div className="cartoverlay-item-counter">Counter</div>
                    <div className="cartoverlay-item-image">
                      <img alt="" src={item.data.gallery[0]} />
                    </div>
                  </div>
                </>
              )
            })}
          </div>
        </div>
      )
    }

    return (
      <>
        <div className="cartoverlay-container">
          <div className="cartoverlay-header">
            {items.length === 1
              ? `My Bag ${items.length} item`
              : `My Bag ${items.length} items`}
          </div>
          <div className="cartoverlay-items-wrapper">
            {items.map((item, index) => {
              console.log(item)
              return (
                <>
                  <div key={item.id} className="cartoverlay-item" key={index}>
                    <div className="cartoverlay-item-info">
                      <p>{item.data.name}</p>
                      {item.data.prices.map((product) => {
                        itemCurrencyArr.push(product)
                      })}
                      <p>{`Price ${itemCurrencyArr[currencyIndex].currency} ${itemCurrencyArr[currencyIndex].amount}`}</p>
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
                      <button onClick={() => this.updateCounter(item.id)}>
                        +
                      </button>
                      <div>{item.count}</div>
                      <button>-</button>
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
            <div className="cartoverlay-total-price">$50</div>
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
        {this.state.show && <Cart />}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  items: state.items.items,
  currency: state.currency.currency,
})
const mapDispatchToProps = { incrementCounter }
//here will be deleteItems reducer later on
//const mapDispatchToProps = { changeCurrency }

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay)
