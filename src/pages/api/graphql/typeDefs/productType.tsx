import { gql } from 'apollo-server-micro'

export default gql`
 type Options {
    name: String,
    value: String
  }

  type Details {
    name: String,
    value: String
  }


  type Product {
    _id: ID!
    thumbnail: String
    sku: String!
    name: String
    description: String
    product_type: String
    class: String
    collection: String
    category: [String]
    options: [Options]
    details: [Details]
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
    related_products: [Product]
    tags: [String]
  }

  type Products {
    products: [Product]
    count: Int
  }

  type Query {
    productPage(search: String, limit: Int, page: Int, sort: Int): Products
    productCategoryPage(collection: String, limit: Int, page: Int): Products
    product(search: String!, by: String): Product
    productById(id: ID!): Product
    products(filter: ProductInput): [Product]
    productsSearch(search: String): [Product]

    testProduct(sku: String!): TestProduct
    testProducts(filter: TestProductInput, page: Int, limit: Int, sort: String, sortDirection: String): [TestProduct]
  }

  input OptionsInput {
    name: String,
    value: String
  }

  input DetailsInput {
    name: String,
    value: String
  }

  input ProductInput {
    thumbnail: String
    sku: String
    name: String
    description: String
    product_type: String
    class: String
    collection: String
    category: [String]
    options: [OptionsInput]
    details: [DetailsInput]
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
    tags: [String]
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
    upsertProduct(input: ProductInput): Output
  }

  type Options {
    name: String,
    value: String
  }

  type Details {
    name: String,
    value: String
  }

  type TestProduct {
    _id: ID!
    sku: String!
    title: String!
    description: String
    type: String
    class: String
    collection: String
    category: [String]
    options: [Options]
    details: [Details]
    gender: String
    price: Float
    status: String
    metal: String
    center_type: String
    center_size: String
    center_shape: String
    side_stone_weight: String
    side_stone_pieces: String
    primary_image: String
    images: [String]
    gemstone: String
    url: String
    meta_keyword: String
    meta_description: String
    meta_title: String
  }

  input OptionInput {
    name: String,
    value: String
  }

  input DetailsInput {
    name: String,
    value: String
  }

  input TestProductInput {
    sku: String
    title: String
    description: String
    type: String
    class: String
    collection: String
    category: [String]
    options: [OptionInput]
    details: [DetailsInput]
    gender: String
    price: Float
    status: String
    metal: String
    center_type: String
    center_size: String
    center_shape: String
    side_stone_weight: String
    side_stone_pieces: String
    primary_image: String
    images: [String]
    gemstone: String
    url: String
    meta_keyword: String
    meta_description: String
    meta_title: String
  }
`