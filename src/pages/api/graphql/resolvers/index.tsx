import accessKeyResolver from './accessKeyResolver'
import categoryResolver from './categoryResolver'
import inquiryResolver from './inquiryResolver'
import productResolver from './productResolver'
import retailerResolver from './retailerResolver'
import userResolver from './userResolver'
import { mergeResolvers } from '@graphql-tools/merge'

const resolvers = [
  accessKeyResolver,
  categoryResolver,
  inquiryResolver,
  productResolver,
  retailerResolver,
  userResolver,
]

export default mergeResolvers(resolvers)
