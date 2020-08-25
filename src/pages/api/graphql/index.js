// pages/api/graphql.js
import { ApolloServer } from 'apollo-server-micro'
import schema from './schema'
import { MongoClient } from 'mongodb'
import jwt from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'
import util from 'util'

import Cors from 'cors'

// Initializing the cors middleware
const cors = Cors({
    methods: ['GET', 'HEAD'],
  })
  

  // Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
      fn(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
  
        return resolve(result)
      })
    })
  }



async function decodeJWT(token) {
    const client = jwksClient({
        jwksUri: `https://${process.env.NEXT_PUBLIC_DOMAIN}/.well-known/jwks.json`
    })

    const getSigningKeyPromise = util.promisify(client.getSigningKey)
    const getSigningKeysPromise = () => {
        return new Promise((resolve, reject) => {
            client.getSigningKeys((err, keys) => {
                if (err) return reject(err)
                resolve(keys)
            })
        })
    }
    const options = {
        audience: `https://vercel.com/angelopaolosantos/api/graphql`,
        issuer: `https://dev-angelops.us.auth0.com/`,
        algorithms: ['RS256']
    }

    const kid = "DLlqwzRy5Z239Xtm0oD6D"
    try {
        const key = await getSigningKeyPromise(kid)
        const keys = await getSigningKeysPromise()
        const signingkey = key.getPublicKey()
        const userInfo = jwt.verify(token, signingkey, options)
        return userInfo
    } catch (err) {
        console.log(err)
    }
}

let db

const apolloServer = new ApolloServer({
    schema,
    context: async ({ req }) => {
        let token = req.headers.authorization || '';

        let userInfo = null

        if (token) {
            if (token.startsWith('Bearer ')) {
                // Remove Bearer from string
                token = token.slice(7, token.length).trimLeft();
            }

            userInfo = await decodeJWT(token)
        }

        if (!db) {
            try {
                const dbClient = new MongoClient(process.env.NEXT_PUBLIC_MONGO_DB_URI,
                    {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                    }
                )

                if (!dbClient.isConnected()) await dbClient.connect()
                db = dbClient.db('uneekdb') // database name
                console.log("connected to mongo database: ", dbClient.isConnected())

            } catch (e) {
                console.log('--->error while connecting with graphql context (db)', e)
            }
        }

        return { db, userInfo }
    },
})

export const config = {
    api: {
        bodyParser: false,
    },
}

export default apolloServer.createHandler({ path: '/api/graphql', cors: true })