import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

let client

if (!client) {
  client = new ApolloClient({
    /** called on the front end too so NEXT_PUBLIC is used */
    uri: `${process.env.NEXT_PUBLIC_UNEEK_DOMAIN}/api/graphql`,
    cache: new InMemoryCache(),
  })
  console.log("Initializing Apollo Client...")
} else {
  console.log("Using cached Apollo Client...")
}

function Provider(props) {
  return (
    <ApolloProvider {...props} client={client}>
      {props.children}
    </ApolloProvider>
  )
}

export default Provider
