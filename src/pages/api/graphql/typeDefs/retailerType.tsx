// data/schema.js
import { gql } from 'apollo-server-micro'

// Define our schema using the GraphQL schema language
export default gql`
  type Retailer {
      ID: Float!
      Title: String!
      Address: String
      URL: String
      Phone: String
      Longitude: Float
      Latitude: Float
      Status: String
  }
  type Query {
    retailers(ID: Int, Status: String): [Retailer]!
  }
`