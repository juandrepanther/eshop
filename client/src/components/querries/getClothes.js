import { gql } from 'apollo-boost'

export const getClothes = gql`
  {
    category(input: { title: "clothes" }) {
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
