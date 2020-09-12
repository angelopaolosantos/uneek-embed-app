// data/schema.js
import { gql } from 'apollo-server-micro'
import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

// Define our schema using the GraphQL schema language
const typeDefs = gql`
  type User {
    _id: ID!
    tenant: String!
    connection: String!
    email: String
    debug: Boolean
  }

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

  type Product {
    _id: ID!
    id: Int
    thumbnail: String
    sku: String
    name: String
    description: String
    product_type: String
    category: [String]
    gender: String
    price: String
    status: String
    metal: String
    center_size: String
    center_shape: String
    side_stone_weight: String
    side_stone_pieces: String
    images: String
    msrp_14k: String
    msrp_18k: String
    msrp_plat: String
    msrp: String
    gemstone: String
    center_stone: String
    url: String
    meta_keyword: String
    meta_description: String
    meta_title: String
  }

  type Category {
    name: String
    parent: Category
  }

  type Count {
      count: Int
  }

  type Products {
    products: [Product]
    count: Int
  }

  type AccessKey {
    _id: ID!
    retailer: String!
    type: String
    status: String
    key: String
    url: String
  }

  type Inquiry {
    _id: ID!
    customer: String
    email: String
    message: String
    product: Product
    retailer: String
  }

  type Query {
    users(id: Int): [User]!
    
    retailers(ID: Int, Status: String): [Retailer]!
    
    productPage(search: String, limit: Int, page: Int): Products
    productCategoryPage(collection: String, limit: Int, page: Int): Products
    products: [Product]
    product(sku: String): Product
    productById(id: ID!): Product
    
    categories: [Category]
    category(id: String): Category
    
    accessKeys(filter: AccessKeyInput): [AccessKey]
    accessKey(_id: ID!): AccessKey

    inquiries: [Inquiry]
  }

  input AccessKeyInput {
    retailer: String
    type: String
    status: String
    key: String
    url: String
  }

  input ProductInput {
    thumbnail: String
    sku: String
    name: String
    description: String
    product_type: String
    category: [String]
    gender: String
    price: String
    status: String
    metal: String
    center_size: String
    center_shape: String
    side_stone_weight: String
    side_stone_pieces: String
    images: String
    msrp_14k: String
    msrp_18k: String
    msrp_plat: String
    msrp: String
    gemstone: String
    center_stone: String
    url: String
    meta_keyword: String
    meta_description: String
    meta_title: String
  }

  type Output {
    success: Boolean
    message: String
  }

  type Mutation {
    createAccessKey(input: AccessKeyInput): Output
    updateAccessKey(_id: ID!, input: AccessKeyInput): Output
    deleteAccessKey(id: ID!): Output

    createProduct(input: ProductInput): Output
    updateProduct(id: ID!, input: ProductInput): Output
    deleteProduct(id: ID!): Output
  }
  

`
export default makeExecutableSchema({ typeDefs, resolvers })