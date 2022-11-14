import {
  ApolloClient, InMemoryCache, createHttpLink, from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import apolloLogger from 'apollo-link-logger';
import jwtDecode from 'jwt-decode';
import type { InMemoryCacheConfig } from '@apollo/client';
import fetch from 'cross-fetch';
import localStorage from 'store';

/** Obtains an access token */
function getAccessToken() {
  const username = process.env.REACT_APP_USERNAME || '';
  const password = process.env.REACT_APP_PASSWORD || '';
  const authEndpoint = `${process.env.REACT_APP_API}/user/obtain-auth-token/`;

  console.log(`%cLINK: ⚙️ Obtaining user access token for user ${username} ...`, 'color: cyan');

  return fetch(authEndpoint, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((user: any) => {
      console.log('%cLINK: ✅ Successfully retrieved access token.\n', 'color: cyan');
      const storagePayload = `{"user":"${JSON.stringify(user).replaceAll('"', '\\"')}"}`;
      window.localStorage.setItem('persist:link', storagePayload);
      return user.access;
    })
    .catch((error) => {
      console.log('%cLINK: ⛔ An error occured:', 'color: red');
      console.error(error);
      return null;
    });
}

/** Creates a new GraphQL client */
export default function createGraphQLClient(url?: string, cacheConfig?: InMemoryCacheConfig) {
  const httpLink = createHttpLink({
    uri: url || window.graphqlUrl || process.env.REACT_APP_GRAPHQL_URI || window.location.origin,
    fetch,
  });

  // eslint-disable-next-line consistent-return
  const authLink = setContext((_, { headers }) => new Promise((resolve, reject) => {
    // Using the user directly from localStorage will eliminate
    // unwanted side effects with Module Federation.
    const { user: persistedUserLocalStorage = '{}' } = localStorage.get('persist:link', { user: '{}' });
    const user = JSON.parse(persistedUserLocalStorage);

    const newHeaders = { ...headers, 'Link-App-Name': 'link' };

    if (!user.token) {
      // --- ONLY FOR DEMO PURPOSES ---
      if (!process.env.REACT_APP_USERNAME && !process.env.REACT_APP_PASSWORD) {
        resolve({ headers: newHeaders });
        return;
      }

      getAccessToken()
        .then((newToken) => {
          if (!newToken) {
            resolve({ headers: newHeaders });
            return;
          }

          resolve({
            headers: {
              ...newHeaders,
              authorization: `JWT ${newToken}`,
            },
          });
        });
      return;
      // !END --- ONLY FOR DEMO PURPOSES ---
    }

    try {
      const accessTokenDecoded = jwtDecode(user.token);
      const refreshTokenDecoded = jwtDecode(user.refresh);
      const refreshValid = Date.now() < (refreshTokenDecoded.exp * 1000);

      // If refresh token is invalid directly throw an error and log user out
      if (!refreshValid) {
        reject(new Error('Refresh token is expired'));
        return;
      }

      // If access token is invalid but there is a valid refresh token, run a refresh
      // and run the GraphQL request with the access token returned from the refresh
      if (Date.now() >= (accessTokenDecoded.exp * 1000)) {
        store.dispatch(refreshToken({ refresh: user.refresh }, (res) => {
          if (res?.data?.access) {
            resolve({
              headers: {
                ...newHeaders,
                authorization: `JWT ${res?.data?.access}`,
              },
            });
            return;
          }
          reject(new Error('Refresh request failed'));
        }));
      } else {
        // User has a valid token, everything is fine!
        resolve({
          headers: {
            ...newHeaders,
            authorization: `JWT ${user.token}`,
          },
        });
        return;
      }
    } catch (err) {
      // Sentry.captureMessage('Force a logout because of a 401.');
      // store.dispatch(logout());
      resolve({ headers: newHeaders });
    }
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
