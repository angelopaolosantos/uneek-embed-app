import { MongoClient } from 'mongodb'

const dbClient = new MongoClient(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const dbName = 'uneekdb'

let db = null

const connect = async () => {
  if (!dbClient.isConnected()) {
    try {
      await dbClient.connect()
      db = dbClient.db(dbName)
    } catch (err) {
      console.log(err.stack)
    }
  } else {
    console.log('using cached mongo')
  }
}

export const getCategories = async () => {
  await connect()
  const result = await db.collection('categories').find({}, {}).toArray()
  return result
}

/**
 * Used in getStaticPaths for products/[sku].tsx
 */
export const getProducts = async () => {
  await connect()
  const result = await db
    .collection('products')
    .find({ status: 'active' })
    .toArray()
  return JSON.parse(JSON.stringify(result))
}

export const getProduct = async (sku) => {
  await connect()
  const result = await db.collection('products').findOne({ sku })
  return JSON.parse(JSON.stringify(result))
}
