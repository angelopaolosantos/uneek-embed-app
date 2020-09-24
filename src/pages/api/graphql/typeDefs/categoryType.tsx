// data/schema.js
import { gql } from 'apollo-server-micro'

// Define our schema using the GraphQL schema language
export default gql`
  type CategoryProduct {
    product_id: ID!
    sort: Int
  }

  type Category {
    _id: ID!
    name: String!
    parent: String!
    category: String!
    customSort: [CategoryProduct]
  }
  type Query {
    categories(filter: CategoryInput): [Category]
    category(id: ID!): Category
  }

  type Output {
    success: Boolean!
    message: String
  }

  input CategoryInput {
    name: String
    parent: String
    category: String
  }

  type Mutation {
    createCategory(input: CategoryInput): Output
    updateCategory(id: ID!, input: CategoryInput): Output
    deleteCategory(id: ID!): Output 
  }
`