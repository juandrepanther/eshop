export default function getPrice(item, currencyIndex) {
 const itemCurrencyArr = []
 item.data.prices.map((product) => itemCurrencyArr.push(product))
 return (
  <>{`${itemCurrencyArr[currencyIndex].currency} ${itemCurrencyArr[currencyIndex].amount}`}</>
 )
}
