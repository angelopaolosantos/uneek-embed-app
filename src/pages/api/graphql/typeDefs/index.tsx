import accessKeyType from './accessKeyType'
import categoryType from './categoryType'
import inquiryType from './inquiryType'
import productType from './productType'
//import productTestType from './productTestType'
import retailerType from './retailerType'
import userType from './userType'
import { mergeTypeDefs } from '@graphql-tools/merge'

const types = [
  accessKeyType,
  categoryType,
  inquiryType,
  productType,
  //productTestType,
  retailerType,
  userType,
]

export default mergeTypeDefs(types)
