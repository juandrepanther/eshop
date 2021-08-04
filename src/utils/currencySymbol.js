export default function currencySymbol(currency) {
 const icons = { USD: '$', GBP: '£', AUD: '$', JPY: '¥', RUB: '₽' }
 return icons[`${currency}`]
}
