export async function getStandaloneApolloClient() {
    const { ApolloClient, InMemoryCache, HttpLink } = await import(
      "@apollo/client"
    );
    return new ApolloClient({
        link: new HttpLink({uri: `${process.env.NEXT_PUBLIC_UNEEK_DOMAIN}/api/graphql`, fetch}),
        cache: new InMemoryCache()
    });
  }