if (process.env.NODE_ENV === 'development') {
  window.apiUrl = process.env.REACT_APP_API;
  window.graphqlUrl = process.env.REACT_APP_GRAPHQL_URI;
  window.sentryEnv = process.env.REACT_APP_SENTRY_ENVIRONMENT || 'local';
  window.useGraphQlDevtools = true;
}

import('./bootstrap');
