import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import history from 'history';
import stateLink from 'state';

const cache = new InMemoryCache();

const httpLink = new HttpLink({
    uri: '/graphql',
    credentials: 'same-origin',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.map(({ name, message }) => {
            if (message === 'You are unauthorized' && name === 'Unauthorized') {
                history.push('/login');
            }
        });
    }
    if (networkError) console.error(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
    link: ApolloLink.from([
        errorLink,
        stateLink(cache),
        httpLink,
    ]),
    cache,
});

export default client;
