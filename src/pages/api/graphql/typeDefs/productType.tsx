import { gql } from 'apollo-server-micro'

export default gql`
  type Product {
    _id: ID!
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
    related: [ID]
  }

  type Products {
    products: [Product]
    count: Int
  }

  type Query {
    productPage(search: String, limit: Int, page: Int): Products
    productCategoryPage(collection: String, limit: Int, page: Int): Products
    product(sku: String!): Product
    productById(id: ID!): Product
    products(filter: ProductInput): [Product]
    productsSearch(search: String): [Product]
  }

  input ProductInput {
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

  type Output {
    success: Boolean
    message: String
  }

  type Mutation {
    createProduct(input: ProductInput): Output
    updateProduct(id: ID!, input: ProductInput): Output
    deleteProduct(id: ID!): Output
    addProductImage(id: ID!, url: String): Output
  }
`