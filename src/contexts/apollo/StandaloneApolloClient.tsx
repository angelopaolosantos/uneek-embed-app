export async function getStandaloneApolloClient() {
    const { ApolloClient, InMemoryCache, HttpLink } = await import(
      "@apollo/client"
    );
    return new ApolloClient({
        link: new HttpLink({uri: `https://vercel.com/angelopaolosantos/api/graphql`, fetch}),
        cache: new InMemoryCache()
    });
  }