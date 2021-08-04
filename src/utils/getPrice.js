/*utility shows prices from Redux store and 
from graphQL items. Also currencies are fetched from graphQL*/
import { Query } from 'react-apollo'
import { ALL_CURRENCIES } from '../querries/querries'

export default function getPrice(item, currency) {
 const icons = ['$', '£', '$', '¥', '₽']
 const itemCurrencyArr = []

 if (item.id) {
  item.data.prices.map((product) => itemCurrencyArr.push(product))
  return (
   <>
    <Query query={ALL_CURRENCIES}>
     {({ loading, error, data }) => {
      if (loading) return <h4>Loading Prices...</h4>
      if (error) console.log(error)
      const currencyIndex = data.currencies.indexOf(currency)
      return (
       <>{`${icons[currencyIndex]} ${itemCurrencyArr[currencyIndex].amount}`}</>
      )
     }}
    </Query>
   </>
  )
 }
 if (item.name) {
  item.prices.map((product) => itemCurrencyArr.push(product))
  return (
   <>
    <Query query={ALL_CURRENCIES}>
     {({ loading, error, data }) => {
      if (loading) return <h4>Loading Prices...</h4>
      if (error) console.log(error)
      const currencyIndex = data.currencies.indexOf(currency)
      return (
       <>{`${icons[currencyIndex]} ${itemCurrencyArr[currencyIndex].amount}`}</>
      )
     }}
    </Query>
   </>
  )
 }
}
