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
  const result = await db.collection('categories2').find({}, {}).toArray()
  //console.log('is connected? ', dbClient.isConnected())
  return result
}

export const getProducts = async () => {
  await connect()
  const result = await db.collection('products').find().toArray()
  //console.log('is connected? ', dbClient.isConnected())
  return JSON.parse(JSON.stringify(result))
}

export const getProduct = async (sku) => {
  await connect()
  const result = await db.collection('products').findOne({ sku })
  //console.log('is connected? ', dbClient.isConnected())
  return JSON.parse(JSON.stringify(result))
}
