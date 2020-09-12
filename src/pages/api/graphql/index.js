// pages/api/graphql.js
import { ApolloServer } from 'apollo-server-micro'
import { MongoClient } from 'mongodb'
import Cors from "micro-cors";
import schemas from './schemas'

const cors = Cors({
    allowMethods: ["GET", "POST", "OPTIONS"]
  });

let db

const apolloServer = new ApolloServer({
    schema: schemas,
    context: async ({ req }) => {
        /*
        let token = req.headers.authorization || '';

        if (token) {
            if (token.startsWith('Bearer ')) {
                // Remove Bearer from string
                token = token.slice(7, token.length).trimLeft();
            }

            userInfo = await decodeJWT(token)
        }*/

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

        return { db }
    },
})

export const config = {
    api: {
        bodyParser: false,
    },
}

const handler = apolloServer.createHandler({ path: '/api/graphql' })

export default cors(handler)