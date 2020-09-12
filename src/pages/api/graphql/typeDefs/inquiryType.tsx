// data/schema.js
import { gql } from 'apollo-server-micro'

// Define our schema using the GraphQL schema language
export default gql`
  type Inquiry {
    _id: ID!
    customer: String
    email: String
    message: String
    product: Product
    retailer: String
  }

  type Query {
    inquiries: [Inquiry]
  }

  type Output {
    success: Boolean
    message: String
  }

  type Mutation {
    deleteInquiry(id: ID!): Output
  }
`