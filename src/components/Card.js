import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addItems } from '../redux/itemsReducer'
import RadioButton from './RadioButton'
import Modal from './Modal'
import { addDecision, deleteDecision } from '../redux/decisionsReducer'
import { showOutModal } from '../redux/outStockReducer'
import { showAttrModal } from '../redux/noAttrReducer'
import '../styles/Card.css'
import getPrice from '../utils/getPrice'
import { ALL_PRODUCTS } from '../querries/querries'
import { Query } from 'react-apollo'

class Card extends Component {
 constructor(props) {
  super(props)
  this.state = {
   bigImageUrl: 0,
   decisions: {},
   inStock: false,
  }
  this.changeBigImage = this.changeBigImage.bind(this)
  this.saveToStore = this.saveToStore.bind(this)
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
  const { showOutModal, showAttrModal } = this.props
  if (!inStock) {
   this.setState({ ...this.state, isOutOfStock: true })
   showOutModal(true)
  } else {
   const { addItems, deleteDecision } = this.props
   if (data.attributes.length) {
    if (Object.keys(this.state.decisions).length) {
     addItems({
      id: Math.random(),
      data: data,
      decisions: this.state.decisions,
      count: 1,
     })
     deleteDecision()
    } else {
     showAttrModal()
     return null
    }
   } else {
    addItems({
     id: Math.random(),
     data: data,
     decisions: this.state.decisions,
     count: 1,
    })
    deleteDecision()
   }
  }
 }

 renderAddToCardBtn(data) {
  return (
   <button
    onClick={() => this.addItemsToStore(data, data.inStock)}
    className={`button-add-to-card${!data.inStock ? '-disabled' : ''}`}>
    ADD TO CART
   </button>
  )
 }
 //need for radioButtons states, otherwise not working. For re-render problem
 shouldComponentUpdate(nextProps, nextState) {
  if (this.state.decisions !== nextState.decisions) {
   return false
  }
  return true
 }

 renderImagesThumbs(data) {
  return (
   <>
    {data.gallery.map((url, index) => {
     return (
      <div key={url}>
       <img
        alt=''
        src={url}
        className='pdp-section-gallery-thumbs-item'
        onClick={() => this.changeBigImage(index)}
       />
      </div>
     )
    })}
   </>
  )
 }

 renderAtributesBtns(data) {
  return (
   <>
    {data.attributes.map((criteria) => {
     return (
      <div className='item-citeria-wrapper' key={criteria.id}>
       {`${criteria.name.toUpperCase()}:`}
       <div className='item-citeria-items' key={Math.random()}>
        {criteria.items.map((decision) => {
         return (
          <div
           key={Math.random()}
           onClick={() =>
            this.saveToStore([criteria.name, decision.displayValue])
           }>
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
   </>
  )
 }

 render() {
  const { currency, isOut, isAttr, items } = this.props
  const isDublicate = items.dublicate
  return (
   <>
    <Query query={ALL_PRODUCTS}>
     {({ loading, error, data }) => {
      if (loading) return <h4>Loading...</h4>
      if (error) console.log(error)
      const { name } = this.props.match.params
      const cardData = data.category.products.find(
       (product) => product.name === name
      )
      return (
       <div className='pdp-container'>
        <div className='pdp-section-gallery'>
         {this.renderImagesThumbs(cardData)}
        </div>
        <div className='pdp-section-gallery-bigImage'>
         <img
          className='pdp-section-gallery-bigImage-image'
          alt=''
          src={cardData.gallery[this.state.bigImageUrl]}></img>
        </div>
        <div className='pdp-section-dashboard'>
         <p>{cardData.name}</p>
         <div className='item-options'>
          {this.renderAtributesBtns(cardData)}
         </div>
         <h2 className='price-title'>PRICE</h2>
         {getPrice(cardData, currency)}
         {this.renderAddToCardBtn(cardData)}
         {/* WARNING MODALS */}
         {isOut && (
          <Modal>Item is OUT of STOCK! You can`t add it to the Cart!</Modal>
         )}
         {isAttr && (
          <Modal>Please choose needed Attributes and then Add To Cart!</Modal>
         )}
         {isDublicate && (
          <Modal>You can`t add the same price with the same attributes!</Modal>
         )}
         <div
          className='item-description'
          dangerouslySetInnerHTML={{ __html: cardData.description }}></div>
        </div>
       </div>
      )
     }}
    </Query>
   </>
  )
 }
}

const mapStateToProps = (state) => ({
 currency: state.currency.currency,
 items: state.items,
 decisions: state.decisions.decisions,
 isOut: state.isOut.isOut,
 isAttr: state.isAttr.isAttr,
})
const mapDispatchToProps = {
 addItems,
 addDecision,
 deleteDecision,
 showOutModal,
 showAttrModal,
}
export default connect(mapStateToProps, mapDispatchToProps)(Card)
