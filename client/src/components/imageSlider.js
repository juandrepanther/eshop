import { Component } from 'react'
import { connect } from 'react-redux'
import {
  deleteItem,
  incrementCounter,
  decrementCounter,
} from '../redux/itemsReducer'

class imageSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageIndex: 0,
    }
    this.nextSlide = this.nextSlide.bind(this)
    this.prevSlide = this.prevSlide.bind(this)
  }

  nextSlide(length) {
    this.setState({
      ...this.state,
      imageIndex:
        this.state.imageIndex === length - 1 ? 0 : this.state.imageIndex + 1,
    })
  }
  prevSlide(length) {
    this.setState({
      ...this.state,
      imageIndex:
        this.state.imageIndex === 0 ? length - 1 : this.state.imageIndex - 1,
    })
  }

  deleteItem(itemIndex) {
    const { deleteItem, incrementCounter, decrementCounter } = this.props
    deleteItem({ itemIndex: itemIndex })
  }

  render() {
    const item = this.props.item
    const length = item.data.gallery.length
    const itemIndex = this.props.itemIndex
    console.log(this.props)

    return (
      <div className="cart-item-image" key={Math.random()}>
        <div className="cart-item-image-slider" key={Math.random()}>
          {item.data.gallery.map((image, index) => {
            return (
              <div
                key={Math.random()}
                className={
                  index === this.state.imageIndex ? 'slide-active' : 'slide'
                }
              >
                {index === this.state.imageIndex && (
                  <img alt="" key={image} src={image} />
                )}
              </div>
            )
          })}

          <button
            key={Math.random()}
            onClick={() => this.deleteItem(itemIndex)}
            className="delete-item"
          >
            X
          </button>
        </div>
        <div
          className="arrow-left"
          key={Math.random()}
          onClick={() => this.prevSlide(length)}
        >
          &#60;
        </div>
        <div
          onClick={() => this.nextSlide(length)}
          className="arrow-right"
          key={Math.random()}
        >
          &#62;
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  items: state.items.items,
  currency: state.currency.currency,
})
const mapDispatchToProps = { incrementCounter, decrementCounter, deleteItem }

export default connect(mapStateToProps, mapDispatchToProps)(imageSlider)
