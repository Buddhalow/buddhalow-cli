import {AsyncStorage} from 'react-native'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { onError } from "apollo-link-error"
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'

import { GRAPH_API_URL} from './credentials'
import buddhalow from './buddhalow'

const httpLink = new HttpLink({ uri: GRAPH_API_URL })
const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  let session = null
  try {
    session = await buddhalow.getSession()
  
   console.log(session)
  } catch (e) {
    throw e
  }
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: session && session.access_token ? `Bearer ${session.access_token}` : "",
    }
  }
})

const link = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

console.log(client)

export default client;
