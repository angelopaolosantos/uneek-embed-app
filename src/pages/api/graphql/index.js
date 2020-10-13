// pages/api/graphql.js
import { ApolloServer } from 'apollo-server-micro'
import { MongoClient } from 'mongodb'
import schemas from './schemas'
import Cors from 'micro-cors' // Add CORS to server, Vercel requirement

/** Setup Auth0 API Authorization */
import jwt from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'
import { promisify } from 'util'
const jwtVerifyPromise = promisify(jwt.verify)
const client = jwksClient({
  // https://uneek.us.auth0.com/.well-known/openid-configuration'
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
})

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey
    callback(null, signingKey)
  })
}

/** Setup CORS */
const cors = Cors({
  allowMethods: ['GET', 'POST', 'OPTIONS'],
})

/** Setup Cached Mongo DB */
let db
const dbName = process.env.MONGO_DB_NAME
const dbClient = new MongoClient(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Call this function to connect to Mongo DB
const connect = async () => {
  if (!dbClient.isConnected()) {
    try {
      await dbClient.connect()
      db = dbClient.db(dbName)
    } catch (err) {
      console.log(err.stack)
    }
  } else {
    console.log('...using cached mongo db')
  }
}

const apolloServer = new ApolloServer({
  schema: schemas,
  context: async ({ req }) => {
    let token = req.headers.authorization || ''
    let auth = null

    if (token) {
      // Check if token format is correct: "Bearer tokenString"
      if (token.startsWith('Bearer ')) { 
        // Remove "Bearer " from string
        token = token.slice(7, token.length).trimLeft() 
        
        //Verify if token is valid
        try {
        const decoded = await jwtVerifyPromise(token, getKey)
        auth = decoded
        } catch(e) {
          console.log(e.message)
        }
      }
    }
    await connect()
    return { db, auth }
  },
})

export const config = {
  api: {
    bodyParser: false,
  },
}

const handler = apolloServer.createHandler({ path: '/api/graphql' })

export default cors(handler)