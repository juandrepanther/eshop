import { PureComponent } from 'react'
import '../styles/CartOverlay.css'

import { connect } from 'react-redux'

class CartOverlay extends PureComponent {
  render() {
    const items = this.props.items
    console.log(items)

    return (
      <>
        <div className='cartoverlay-container'>
          <div className='cartoverlay-header'>
            {items.length === 1
              ? `My Bag ${items.length} item`
              : `My Bag ${items.length} items`}
          </div>
          <div className='cartoverlay-items-wrapper'>
            {items.map((item, index) => {
              return (
                <>
                  <div className='cartoverlay-item' key={index}>
                    <div className='cartoverlay-item-info'>
                      <p>{item.data.name}</p>
                      <p>Price 50$</p>
                      <div className='cartoverlay-item-info-decisions-box-wrapper'>
                        {Object.values(item.decisions).map((decision) => {
                          return (
                            <>
                              <div className='cartoverlay-item-info-decisions-box'>
                                {decision}
                              </div>
                            </>
                          )
                        })}
                      </div>
                    </div>
                    <div className='cartoverlay-item-counter'>Counter</div>
                    <div className='cartoverlay-item-image'>
                      <img alt='' src={item.data.gallery[0]} />
                    </div>
                  </div>
                </>
              )
            })}
          </div>
          <div className='cartoverlay-total-box'>
            <div className='cartoverlay-total-text'>Total</div>
            <div className='cartoverlay-total-price'>$50</div>
          </div>
          <div className='cartoverlay-checkout-box'>
            <button className='cartoverlay-checkout-bagBtn'>VIEW BAG</button>
            <button className='cartoverlay-checkout-checkBtn'>CHECK OUT</button>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  items: state.items.items,
})
//here will be deleteItems reducer later on
//const mapDispatchToProps = { changeCurrency }

export default connect(mapStateToProps)(CartOverlay)
