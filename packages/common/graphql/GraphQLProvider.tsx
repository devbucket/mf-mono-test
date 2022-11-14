import React from 'react';
import type { ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client';
import type { InMemoryCacheConfig } from '@apollo/client';
import createGraphQLClient from './createGraphQLClient';

type Props = {
  children: ReactNode;
  url?: string;
  cacheConfig?: InMemoryCacheConfig;
}

export default function GraphQLProvider({ url, children, cacheConfig }: Props) {
  const client = createGraphQLClient(url, cacheConfig);
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}
