import {
  ApolloClient, InMemoryCache, createHttpLink, from,
} from '@apollo/client';
import type { InMemoryCacheConfig } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import apolloLogger from 'apollo-link-logger';
import useUserStore from 'auth/store';
import fetch from 'cross-fetch';
import jwtDecode from 'jwt-decode';

import getAccessToken from './getAccessToken';

const { getUser } = useUserStore.getState();

/** Creates a new GraphQL client */
export default function createGraphQLClient(url?: string, cacheConfig?: InMemoryCacheConfig) {
  const username = process.env.REACT_APP_USERNAME || '';
  const password = process.env.REACT_APP_PASSWORD || '';

  const httpLink = createHttpLink({
    uri: url || window.graphqlUrl || process.env.REACT_APP_GRAPHQL_URI || window.location.origin,
    fetch,
  });

  const authLink = setContext((_, { headers }) => new Promise((resolve) => {
    const newHeaders = { ...headers, 'Link-App-Name': 'link' };

    getUser()
      .then((user) => {
        if (!user || !user?.token) {
          // --- ONLY FOR DEMO PURPOSES ---
          if (!process.env.REACT_APP_USERNAME && !process.env.REACT_APP_PASSWORD) {
            return { headers: newHeaders };
          }

          return getAccessToken(username, password)
            .then((newToken) => {
              if (!newToken) {
                return { headers: newHeaders };
              }

              return {
                headers: {
                  ...newHeaders,
                  authorization: `JWT ${newToken}`,
                },
              };
            })
            .catch((error) => {
              console.error(error);
              return { headers: newHeaders };
            });
          // !END --- ONLY FOR DEMO PURPOSES ---
        }

        try {
          // const accessTokenDecoded = jwtDecode(user.token);
          const refreshTokenDecoded = jwtDecode(user.refresh);
          const refreshValid = Date.now() < (refreshTokenDecoded.exp * 1000);

          // If refresh token is invalid directly throw an error and log user out
          if (!refreshValid) {
            console.error(new Error('Refresh token is expired'));
            return { headers: newHeaders };
          }

          // If access token is invalid but there is a valid refresh token, run a refresh
          // and run the GraphQL request with the access token returned from the refresh
          // if (Date.now() >= (accessTokenDecoded.exp * 1000)) {
          //   store.dispatch(refreshToken({ refresh: user.refresh }, (res) => {
          //     if (res?.data?.access) {
          //       resolve({
          //         headers: {
          //           ...newHeaders,
          //           authorization: `JWT ${res?.data?.access}`,
          //         },
          //       });
          //       return;
          //     }
          //     console.error(new Error('Refresh request failed'));
          //     resolve({ headers: newHeaders });
          //   }));
          // } else {
          // User has a valid token, everything is fine!
          return {
            headers: {
              ...newHeaders,
              authorization: `JWT ${user.token}`,
            },
          };
          // }
        } catch (err) {
          console.log(err, 'color: red');
          // Sentry.captureMessage('Force a logout because of a 401.');
          // store.dispatch(logout());
          return { headers: newHeaders };
        }
      })
      .then((response) => resolve(response));
  }));

  /** Enables browser logging */
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      console.groupCollapsed('%cGraphQL Errors', 'color: red;');
      graphQLErrors.forEach((graphqlError) => console.log(graphqlError));
      console.groupEnd();
    }

    if (networkError) {
      console.log(`%c[Network error]: ${networkError}`, 'color: red;');
    }
  });

  // TODO: sentry Link

  const client = new ApolloClient({
    link: from([
      window.useGraphQlDevtools && apolloLogger,
      window.useGraphQlDevtools && errorLink,
      // sentry,
      authLink.concat(httpLink),
    ].filter(Boolean)),
    cache: new InMemoryCache(cacheConfig),
    connectToDevTools: window.useGraphQlDevtools || false,
  });

  return client;
}
