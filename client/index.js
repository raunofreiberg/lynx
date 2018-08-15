import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';

import Router from 'router';
import client from 'apollo';

ReactDOM.render(
    <ApolloProvider client={client}>
        <Router />
    </ApolloProvider>,
    document.getElementById('root'),
);
