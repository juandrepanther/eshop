import React, { Component } from 'react'
import parse from 'html-react-parser'
import { connect } from 'react-redux'
import { addItems } from '../redux/itemsReducer'
import RadioButton from './RadioButton'
import { addDecision, deleteDecision } from '../redux/decisionsReducer'
import '../styles/Card.css'

//Toast import, styles and configuration
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()
class Card extends Component {
 constructor(props) {
  super(props)
  this.state = {
   bigImageUrl: 0,
   decisions: {},
  }
  this.changeBigImage = this.changeBigImage.bind(this)
  this.saveToStore = this.saveToStore.bind(this)
  this.getPrice = this.getPrice.bind(this)
  this.addItemsToStore = this.addItemsToStore.bind(this)
 }

 changeBigImage(number) {
  this.setState({ ...this.state, bigImageUrl: number })
 }

 saveToStore([criteria, decision]) {
  const newObj = { [criteria]: decision }

  if (Object.keys(this.state.decisions).length >= 1) {
   const decisionsClone = { ...this.state.decisions }
   const newDecisionsObj = Object.assign(decisionsClone, newObj)
   this.setState({
    ...this.state,
    decisions: newDecisionsObj,
   })
  }

  if (Object.keys(this.state.decisions).length === 0) {
   this.setState({
    ...this.state,
    decisions: newObj,
   })
  }
 }

 addItemsToStore(data, inStock) {
  console.log(inStock)
  if (!inStock) {
   toast.warn('Selected Price is OUT OF STOCK. \n You cant it Add to Cart!', {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000,
   })
  } else {
   const { addItems, deleteDecision } = this.props
   addItems({
    id: Math.random(),
    data: data,
    decisions: this.state.decisions,
    count: 1,
   })
   deleteDecision()
  }
 }

 addToCardBtn(data) {
  return (
   <button
    onClick={() => this.addItemsToStore(data, data.inStock)}
    className={`button-add-to-card-${!data.inStock && 'disabled'}`}
   >
    ADD TO CART
   </button>
  )
 }

 getPrice(currencyIndex, data) {
  const productCurrencyArr = []
  data.prices.map((product) => productCurrencyArr.push(product))
  return (
   <div className="pdp-section-dashboard-valid-price">{`${productCurrencyArr[currencyIndex].currency} ${productCurrencyArr[currencyIndex].amount}`}</div>
  )
 }

 //need for radioButtons states, otherwise not working. For re-render problem
 shouldComponentUpdate(nextProps, nextState) {
  if (this.state.decisions !== nextState.decisions) {
   return false
  }
  return true
 }

 render() {
  const currencyIndex = this.props.currencyIndex
  const data = this.props.data
  return (
   <>
    <div className="pdp-container">
     <div className="pdp-section-gallery">
      {data.gallery.map((url, index) => {
       return (
        <div className="pdp-section-gallery-thumbs" key={Math.random()}>
         <img
          key={url}
          alt=""
          src={url}
          className="pdp-section-gallery-thumbs-item"
          style={{ width: '100px', height: '100px' }}
          onClick={() => this.changeBigImage(index)}
         />
        </div>
       )
      })}
     </div>
     <div className="pdp-section-gallery-bigImage">
      <img
       className="pdp-section-gallery-bigImage-image"
       alt=""
       src={data.gallery[this.state.bigImageUrl]}
      ></img>
     </div>
     <div className="pdp-section-dashboard">
      <p>{data.name}</p>
      <div className="item-options">
       {data.attributes.map((criteria) => {
        return (
         <div className="item-citeria-wrapper" key={criteria.id}>
          {`${criteria.name}:`}
          <div className="item-citeria-items" key={Math.random()}>
           {criteria.items.map((decision) => {
            return (
             <div
              key={Math.random()}
              onClick={() =>
               this.saveToStore([criteria.name, decision.displayValue])
              }
             >
              <RadioButton
               decision={decision}
               criteria={criteria}
               isInStock={data.inStock}
              />
             </div>
            )
           })}
          </div>
         </div>
        )
       })}
      </div>
      <h2>PRICE</h2>
      {this.getPrice(currencyIndex, data)}
      {this.addToCardBtn(data)}
      <div className="item-description">{parse(data.description)}</div>
     </div>
    </div>
   </>
  )
 }
}

const mapStateToProps = (state) => ({
 currency: state.currency.currency,
 items: state.items.items,
 decisions: state.decisions.decisions,
})
const mapDispatchToProps = { addItems, addDecision, deleteDecision }
export default connect(mapStateToProps, mapDispatchToProps)(Card)
