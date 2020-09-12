// data/schema.js
import { gql } from 'apollo-server-micro'

// Define our schema using the GraphQL schema language
export default gql`
  type User {
    _id: ID!
    tenant: String!
    connection: String!
    email: String
    debug: Boolean
  }
  type Query {
    users(id: Int): [User]!
  }
`