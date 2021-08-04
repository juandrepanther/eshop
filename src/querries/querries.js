import { gql } from 'apollo-boost'

export const FILTER_PRODUCTS = gql`
 query($category: String!) {
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

export const ALL_PRODUCTS = gql`
 {
  category {
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
export const ALL_CURRENCIES = gql`
 {
  currencies
 }
`
