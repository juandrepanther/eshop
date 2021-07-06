import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PDP from './PDP'

class Card extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      showPdp: false,
      bigImageUrl: 0,
    }
    this.handleClick = this.handleClick.bind(this)
    this.changeBigImage = this.changeBigImage.bind(this)
  }

  handleClick(data) {
    this.setState({ data: data, showPdp: true })
  }

  changeBigImage(number) {
    this.setState({ ...this.state, bigImageUrl: number })
  }
  open() {
    return (
      <>
        <div className='pdp-container'>
          <div className='pdp-section-gallery'>
            {this.state.data.gallery.map((url, index) => {
              return (
                <>
                  <div className='pdp-section-gallery-thumbs'>
                    <img
                      alt=''
                      src={url}
                      className='pdp-section-gallery-thumbs-item'
                      style={{ width: '100px', height: '100px' }}
                      onClick={() => this.changeBigImage(index)}
                    />
                  </div>
                </>
              )
            })}
          </div>
          <div className='pdp-section-gallery-bigImage'>
            <img
              className='pdp-section-gallery-bigImage-image'
              alt=''
              src={this.state.data.gallery[this.state.bigImageUrl]}></img>
          </div>
          <div className='pdp-section-dashboard'>Hello</div>
        </div>
      </>
    )
  }
  render() {
    console.log(this.state.data)
    const currency = this.props.currency //example USD 'string'
    const currencyItem = ['USD', 'GBP', 'AUD', 'JPY', 'RUB']
    const index = currencyItem.indexOf(currency)
    const icons = ['$', '£', '$', '¥', '₽']

    if (!this.props.data.length) {
      return null
    } else {
      return (
        <>
          <div className='products-container'>
            <div className='products-card-wrapper'>
              {this.props.data.map((product, i) => {
                return (
                  <div
                    key={i}
                    className='card-container'
                    onClick={() => {
                      this.handleClick(product)
                    }}>
                    <img
                      className='card-image'
                      alt=''
                      src={product.gallery[0]}></img>
                    <div className='card-text-box'>
                      <h3>{product.name}</h3>
                      <h3>
                        {`${icons[index]}`}
                        {product.prices.map((i) => Object.values(i)[0])[index]}
                      </h3>
                    </div>
                  </div>
                )
              })}
              {this.state.showPdp && this.open()}
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
