import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { showPdp } from '../redux/showPdpReducer'
import HoverBasket from '../media/HoverBasket.png'
import Card from './Card'

//graphQl querries, filtering and apollo-client
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

const FILTER_PRODUCTS = gql`
 query ($category: String!) {
  category(input: { title: $category }) {
   products {
    category
    name
    description
    gallery
    prices {
     amount
     currency
    }
    inStock
    attributes {
     id
     name
     type
     items {
      id
      displayValue
     }
    }
   }
  }
 }
`

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

 displayProducts() {
  const currency = this.props.currency
  const currencyItem = ['USD', 'GBP', 'AUD', 'JPY', 'RUB']
  const index = currencyItem.indexOf(currency)
  const stockOptions = ['', 'notInStock']
  const icons = ['$', '£', '$', '¥', '₽']
  const status = this.props.status.status
  let { category = '' } = this.props.match.params

  return (
   <>
    {category !== 'cart' ? (
     <Query query={FILTER_PRODUCTS} variables={{ category: `${category}` }}>
      {({ loading, error, data }) => {
       if (loading) return <h4>Loading...</h4>
       if (error) console.log(error)

       return (
        <div className="products-container">
         <div className="products-card-wrapper">
          {data.category.products.map((product, cardIndex) => {
           if (product.inStock) {
            return (
             <div
              key={product.description}
              className={`card-container ${stockOptions[0]}`}
              onClick={() => {
               this.handleClick(product, cardIndex)
              }}
             >
              <div className="card-hover-cart">
               <img alt="" src={HoverBasket} />
              </div>
              <img className="card-image" alt="" src={product.gallery[0]}></img>
              <div className="card-text-box">
               <h3>{product.name}</h3>
               <h3>
                {`${icons[index]}`}
                {product.prices.map((i) => Object.values(i)[0])[index]}
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
              <img className="card-image" alt="" src={product.gallery[0]} />
              <h5>OUT OF STOCK</h5>
              <div className="card-text-box">
               <h3>{product.name}</h3>
               <h3>
                {`${icons[index]}`}
                {product.prices.map((i) => Object.values(i)[0])[index]}
               </h3>
              </div>
             </div>
            )
           }
          })}
          {status && <Card currencyIndex={index} data={this.state.data} />}
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
 status: state.status,
})
const mapDispatchToProps = { showPdp }
export default connect(mapStateToProps, mapDispatchToProps)(Cards)
