import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import parse from 'html-react-parser'

class Card extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      showPdp: false,
      bigImageUrl: 0,
      cardIndex: 0,
      decisions: [],
    }
    this.handleClick = this.handleClick.bind(this)
    this.changeBigImage = this.changeBigImage.bind(this)
    this.saveToStore = this.saveToStore.bind(this)
  }

  handleClick(data, cardIndex) {
    this.setState({
      ...this.state,
      data: data,
      showPdp: true,
      cardIndex: cardIndex,
    })
  }

  saveToStore(criteria, decision) {
    const obj = { [criteria]: decision }
    this.setState({
      ...this.state,
      decisions: Object.assign(this.state.decisions, obj),
    })

    console.log(this.state.decisions)
  }
  changeBigImage(number) {
    this.setState({ ...this.state, bigImageUrl: number })
  }
  open(currencyIndex) {
    return (
      <>
        <div className='pdp-container'>
          <div className='pdp-section-gallery'>
            {this.state.data.gallery.map((url, index) => {
              return (
                <>
                  <div className='pdp-section-gallery-thumbs' key={index}>
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
          <div className='pdp-section-dashboard'>
            <p>{this.state.data.name}</p>
            <div className='item-options'>
              {this.state.data.attributes.map((criteria) => {
                return (
                  <div className='item-citeria-wrapper' key={criteria.id}>
                    {`${criteria.name}:`}
                    <div className='item-citeria-items'>
                      {criteria.items.map((decision) => {
                        return (
                          <div
                            value={decision.displayValue}
                            onClick={() =>
                              this.saveToStore(
                                criteria.name,
                                decision.displayValue
                              )
                            }
                            className='item-citeria-items-box'
                            key={decision.id}>
                            {decision.displayValue}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
            <h2>PRICE</h2>
            {this.props.data.map((product) => {
              return (
                <>
                  {/* {
                    product.prices.map((i) => Object.values(i)[0])[
                      currencyIndex
                    ]
                  } */}
                  {/* {product.prices.map((i) => console.log(i))} */}
                </>
              )
            })}
            <button className='button-add-to-card'>ADD TO CART</button>
            <div className='item-description'>
              {parse(this.state.data.description)}
            </div>
          </div>
        </div>
      </>
    )
  }
  render() {
    const currency = this.props.currency //example USD 'string'
    const currencyItem = ['USD', 'GBP', 'AUD', 'JPY', 'RUB']
    const index = currencyItem.indexOf(currency)

    const icons = ['$', '£', '$', '¥', '₽']

    //console.log(this.state)

    if (!this.props.data.length) {
      return null
    } else {
      return (
        <>
          <div className='products-container'>
            <div className='products-card-wrapper'>
              {this.props.data.map((product, cardIndex) => {
                return (
                  <div
                    key={cardIndex}
                    className='card-container'
                    onClick={() => {
                      this.handleClick(product, cardIndex)
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
              {this.state.showPdp && this.open(index)}
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
