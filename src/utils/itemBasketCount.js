export default function itemBasketCount(allItems) {
 let res = 0
 for (const itemCount of allItems) {
  res += itemCount.count
 }
 return res
}
