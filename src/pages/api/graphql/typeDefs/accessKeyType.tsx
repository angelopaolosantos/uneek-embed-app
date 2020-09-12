// data/schema.js
import { gql } from 'apollo-server-micro'

// Define our schema using the GraphQL schema language
export default gql`
  type AccessKey {
    _id: ID!
    retailer: String!
    type: String
    status: String
    key: String
    url: String
  }

  type Query {
    accessKeys(filter: AccessKeyInput): [AccessKey]
    accessKey(id: ID!): AccessKey
  }

  input AccessKeyInput {
    retailer: String
    type: String
    status: String
    key: String
    url: String
  }

  type Output {
    success: Boolean
    message: String
  }

  type Mutation {
    createAccessKey(input: AccessKeyInput): Output
    updateAccessKey(id: ID!, input: AccessKeyInput): Output
    deleteAccessKey(id: ID!): Output
  }
`