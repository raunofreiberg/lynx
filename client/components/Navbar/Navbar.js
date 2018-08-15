import React, { Component } from 'react';
import { graphql, withApollo } from 'react-apollo';
import { logoutMutation } from 'graphql/mutations/Authentication.graphql';
import userQuery from 'graphql/queries/CurrentUser.graphql';
import { clearStorage } from 'utils/localStorage';

@graphql(logoutMutation, {
    props: ({ mutate }) => ({
        logout: () => mutate(),
    }),
})
@graphql(userQuery, {
    props: ({ data: { user } }) => ({
        user,
    }),
})
@withApollo
export default class Navbar extends Component {
    onLogout = () => {
        this.props.logout();
        this.props.client.resetStore();
        this.props.history.push('/');
        clearStorage();
    };

    render() {
        return (
            <div>
                <h1>{this.props.user && this.props.user.username}</h1>
                <button onClick={this.onLogout}>Logout</button>
            </div>
        );
    }
}
