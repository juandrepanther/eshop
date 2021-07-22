import { gql } from 'apollo-boost'

export const getProducts = {
  allProducts: gql`
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
  `,
}
