// data/schema.js
import { gql } from 'apollo-server-micro'

// Define our schema using the GraphQL schema language
export default gql`
  type CategoryProduct {
    product: Product
    sort: Int
  }
  type Category {
    _id: ID!
    name: String!
    parent: String!
    category: String!
    products: [Product]
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
    products: [CategoryProductInput]
  }

  input CategoryProductInput {
    _id: String
    thumbnail: String
    sku: String
    name: String
    description: String
    product_type: String
    category: [String]
    gender: String
    price: Float
    status: String
    metal: String
    center_size: String
    center_shape: String
    side_stone_weight: String
    side_stone_pieces: String
    primary_image: String
    images: [String]
    msrp_14k: Float
    msrp_18k: Float
    msrp_plat: Float
    msrp: Float
    gemstone: String
    center_stone: String
    url: String
    meta_keyword: String
    meta_description: String
    meta_title: String
  }

  type Mutation {
    createCategory(input: CategoryInput): Output
    updateCategory(id: ID!, input: CategoryInput): Output
    updateCategory2(id: ID!, input: CategoryInput): Output
    deleteCategory(id: ID!): Output 
    updateCategoryProducts(category: String!, sort: String): Output
  }
`