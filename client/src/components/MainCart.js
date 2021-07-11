import React, { Component } from 'react'
import { connect } from 'react-redux'
import { incrementCounter, decrementCounter } from '../redux/itemsReducer'

class MainCart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      count: 1,
      item: [],
    }
    this.updateCounter = this.updateCounter.bind(this)
    this.getPrice = this.getPrice.bind(this)
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
  render() {
    const items = this.props.items
    const currency = this.props.currency //example USD 'string'
    const currencyItem = ['USD', 'GBP', 'AUD', 'JPY', 'RUB']
    const currencyIndex = currencyItem.indexOf(currency)

    return (
      <div className="cart-container">
        <div className="cart-wrapper">
          <h5>CART</h5>
          {items.map((item) => {
            return (
              <>
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-info">
                    <p>{item.data.name}</p>
                    {this.getPrice(item, currencyIndex)}
                    <div className="cart-item-info-decisions-box-wrapper">
                      {Object.values(item.decisions).map((decision) => {
                        return (
                          <>
                            <div className="cart-item-info-decisions-box">
                              {decision}
                            </div>
                          </>
                        )
                      })}
                    </div>
                  </div>
                  <div className="cart-item-counter">
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
                  <div className="cart-item-image">
                    <div className="cart-item-image-wrapper">
                      <img alt="" src={item.data.gallery[0]} />
                    </div>
                    <div className="arrow-left">&#60;</div>
                    <div className="arrow-right">&#62;</div>
                  </div>
                </div>
              </>
            )
          })}
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
//here will be deleteItems reducer later on
//const mapDispatchToProps = { changeCurrency }

export default connect(mapStateToProps, mapDispatchToProps)(MainCart)
