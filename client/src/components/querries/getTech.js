import { gql } from 'apollo-boost'

export const getTech = gql`
  {
    category(input: { title: "tech" }) {
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
