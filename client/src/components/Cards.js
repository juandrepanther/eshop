import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { showPdp } from '../redux/showPdpReducer'

import Card from './Card'

const initialData = {
  data: {},
  showPdp: false,
  bigImageUrl: 0,
  cardIndex: 0,
}
class Cards extends PureComponent {
  constructor(props) {
    super(props)
    this.state = initialData
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(data, cardIndex) {
    const { showPdp } = this.props
    this.setState({
      ...this.state,
      data: data,
      cardIndex: cardIndex,
      showPdp: true,
    })
    showPdp(true)
  }

  render() {
    const currency = this.props.currency
    const currencyItem = ['USD', 'GBP', 'AUD', 'JPY', 'RUB']
    const index = currencyItem.indexOf(currency)
    const stockOptions = ['', 'notInStock']
    const icons = ['$', '£', '$', '¥', '₽']
    const status = this.props.status.status

    if (!this.props.data.length) {
      return null
    } else {
      return (
        <>
          <div className="products-container">
            <div className="products-card-wrapper">
              {this.props.data.map((product, cardIndex) => {
                if (product.inStock) {
                  return (
                    <div
                      key={product.description}
                      className={`card-container ${stockOptions[0]}`}
                      onClick={() => {
                        this.handleClick(product, cardIndex)
                      }}
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
                          {
                            product.prices.map((i) => Object.values(i)[0])[
                              index
                            ]
                          }
                        </h3>
                      </div>
                    </div>
                  )
                } else {
                  return (
                    <div
                      key={product.description}
                      className={`card-container ${stockOptions[1]}`}
                    >
                      <img
                        className="card-image"
                        alt=""
                        src={product.gallery[0]}
                      />
                      <h5>OUT OF STOCK</h5>
                      <div className="card-text-box">
                        <h3>{product.name}</h3>
                        <h3>
                          {`${icons[index]}`}
                          {
                            product.prices.map((i) => Object.values(i)[0])[
                              index
                            ]
                          }
                        </h3>
                      </div>
                    </div>
                  )
                }
              })}
              {status && <Card currencyIndex={index} data={this.state.data} />}
            </div>
          </div>
        </>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency.currency,
  items: state.items.items,
  status: state.status,
})
const mapDispatchToProps = { showPdp }
export default connect(mapStateToProps, mapDispatchToProps)(Cards)
