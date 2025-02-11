import { ApolloServer } from '@apollo/server'
import { createServer } from 'http'
import cors from 'cors'
import express from 'express'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/use/ws'
import { expressMiddleware } from '@apollo/server/express4'
import client from './prisma/client.js'

import typeDefs from './typedefs/index.js'
import resolvers from './resolvers/index.js'

const PORT = 4000

// Create the schema, which will be used separately by ApolloServer and
// the WebSocket server.
const schema = makeExecutableSchema({ typeDefs, resolvers })

// Create an Express app and HTTP server; we will attach both the WebSocket
// server and the ApolloServer to this HTTP server.
const app = express()
const httpServer = createServer(app)

// Create our WebSocket server using the HTTP server we just set up.
const wsServer = new WebSocketServer({ server: httpServer, path: '/subscriptions' })
// Save the returned server's info so we can shutdown this server later
const serverCleanup = useServer({ schema }, wsServer)

// Set up ApolloServer.
const server = new ApolloServer({
  schema,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),
    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup().dispose()
          }
        }
      }
    }
  ],
})

await server.start()
app.use(
  '/graphql',
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token, prisma: client })
  }),
)

// Now that our HTTP server is fully set up, we can listen to it.
httpServer.listen(PORT, () => {
  console.log(`🚀  Server ready at: http://localhost:${PORT}/graphql`)
})
