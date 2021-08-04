import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { showPdp } from '../redux/showPdpReducer'
import HoverBasket from '../media/HoverBasket.png'
import getPrice from '../utils/getPrice'
import { Query } from 'react-apollo'
import '../styles/Cards.css'
import { addItems } from '../redux/itemsReducer'
import { FILTER_PRODUCTS } from '../querries/querries'

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

 addToCartFromPLP(productData) {
  const { addItems } = this.props
  addItems({
   id: Math.random(),
   data: productData,
   decisions: {},
   count: 1,
  })
 }

 displayProducts() {
  const { currency } = this.props
  const stockOptions = ['', 'notInStock']
  let { category = '' } = this.props.match.params
  /*below conditional rendering is important,
  because grapgql querry in this case uses uri as variable
  */
  return (
   <>
    {category === '' || category === 'tech' || category === 'clothes' ? (
     <Query query={FILTER_PRODUCTS} variables={{ category: `${category}` }}>
      {({ loading, error, data }) => {
       if (loading) return <h4>Loading...</h4>
       if (error) console.log(error)
       const categoryTitle =
        this.props.location.pathname === '/'
         ? 'ALL'
         : this.props.location.pathname.replace('/', '').toUpperCase()
       return (
        <div className='products-container'>
         <div className='products-category-title'>{categoryTitle}</div>
         <div className='products-card-wrapper'>
          {data.category.products.map((product, cardIndex) => {
           if (product.inStock) {
            return (
             <NavLink
              to={`/${product.category}/${product.name}`}
              key={product.description}>
              <div
               className={`card-container ${stockOptions[0]}`}
               onClick={() => {
                this.handleClick(product, cardIndex)
               }}>
               {!Object.keys(product.attributes).length && (
                <div className='card-hover-cart'>
                 <img
                  alt=''
                  src={HoverBasket}
                  onClick={(e) => {
                   e.stopPropagation()
                   e.preventDefault()
                   this.addToCartFromPLP(product)
                  }}
                 />
                </div>
               )}
               <img
                className='card-image'
                alt=''
                src={product.gallery[0]}></img>
               <div className='card-text-box'>
                <h3>{product.name}</h3>
                {getPrice(product, currency)}
               </div>
              </div>
             </NavLink>
            )
           } else {
            return (
             <NavLink
              to={`/${product.category}/${product.name}`}
              key={product.description}>
              <div
               className={`card-container ${stockOptions[1]}`}
               onClick={() => {
                this.handleClick(product, cardIndex)
               }}>
               <img className='card-image' alt='' src={product.gallery[0]} />
               <h5>OUT OF STOCK</h5>
               <div className='card-text-box'>
                <h3>{product.name}</h3>
                {getPrice(product, currency)}
               </div>
              </div>
             </NavLink>
            )
           }
          })}
         </div>
        </div>
       )
      }}
     </Query>
    ) : null}
   </>
  )
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
  return <>{this.displayProducts()}</>
 }
}

const mapStateToProps = (state) => ({
 currency: state.currency.currency,
 items: state.items.items,
})
const mapDispatchToProps = { showPdp, addItems }
export default connect(mapStateToProps, mapDispatchToProps)(Cards)
