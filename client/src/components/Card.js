import React, { Component } from 'react'
import { connect } from 'react-redux'

class Card extends Component {
  open(data) {
    alert(data)
  }
  render() {
    const currency = this.props.currency //example USD 'string'
    const currencyItem = ['USD', 'GBP', 'AUD', 'JPY', 'RUB']
    const index = currencyItem.indexOf(currency)
    const icons = ['$', '£', '$', '¥', '₽']

    if (!this.props.data.length) {
      return null
    } else {
      return (
        <>
          <div className="products-container">
            <div className="products-card-wrapper">
              {this.props.data.map((product, i) => {
                return (
                  <div
                    key={i}
                    className="card-container"
                    onClick={() => this.open(`${product.name}`)}
                  >
                    <img
                      className="card-image"
                      alt=""
                      src={product.gallery[0]}
                    ></img>
                    <div className="card-text-box">
                      <h3>{product.name}</h3>
                      <h3>
                        {`${icons[index]}`}
                        {product.prices.map((i) => Object.values(i)[0])[index]}
                      </h3>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency.currency,
})

export default connect(mapStateToProps)(Card)
