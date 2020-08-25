import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_UNEEK_DOMAIN}/api/graphql`,
    cache: new InMemoryCache()
})

function AProvider(props) {
  return (
    <ApolloProvider {...props} client={client}>
      {props.children}
    </ApolloProvider>
  );
}

export default AProvider