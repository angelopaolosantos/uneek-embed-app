import { gql } from 'apollo-server-micro'

export default gql`
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

  type Products {
    products: [Product]
    count: Int
  }

  type Query {
    productPage(search: String, limit: Int, page: Int): Products
    productCategoryPage(collection: String, limit: Int, page: Int): Products
    products: [Product]
    product(sku: String): Product
    productById(id: ID!): Product
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
    createProduct(input: ProductInput): Output
    updateProduct(id: ID!, input: ProductInput): Output
    deleteProduct(id: ID!): Output
  }
`