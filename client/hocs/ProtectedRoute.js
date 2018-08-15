import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import setUserMutation from 'graphql/mutations/CurrentUser.graphql';
import { getItemFromStorage } from 'utils/localStorage';

export default function (ComposedComponent) {
    @graphql(setUserMutation, {
        props: ({ mutate }) => ({
            setUser: ({ id, username }) => mutate({ variables: { username, id } }),
        }),
    })
    class ProtectedRoute extends Component {
        componentDidMount() {
            if (!getItemFromStorage('currentUser')) {
                this.props.history.push('/login');
            }
            this.setUser();
        }

        componentDidUpdate() {
            if (!getItemFromStorage('currentUser')) {
                this.props.history.push('/login');
            }
            this.setUser();
        }

        setUser() {
            const user = getItemFromStorage('currentUser');
            if (user) {
                this.props.setUser(user);
            }
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    return ProtectedRoute;
}
