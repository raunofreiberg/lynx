import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { registerMutation, loginMutation } from 'graphql/mutations/Authentication.graphql';
import { storeItem } from 'utils/localStorage';

console.log(Link)

@graphql(loginMutation, {
    props: ({ mutate }) => ({
        login: ({ username, password }) => mutate({ variables: { username, password } }),
    }),
})
@graphql(registerMutation, {
    props: ({ mutate }) => ({
        register: ({ username, password }) => mutate({ variables: { username, password } }),
    }),
})
export default class Authentication extends Component {
    isRegister = this.props.location.pathname === '/register';

    state = {
        username: '',
        password: '',
        errors: [],
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        const { login, register, history } = this.props;

        try {
            const res = this.isRegister ? await register({ username, password }) : await login({ username, password });

            if (res.data) {
                const user = this.isRegister ? res.data.register : res.data.login;
                storeItem('currentUser', user);
            }
            history.push('/');
        } catch (error) {
            console.error(error);
            const errors = error.graphQLErrors.map(err => err.message);
            this.setState({ errors });
        }
    };

    render() {
        const { errors } = this.state;

        return (
            <div>
                <h1>{this.props.location.pathname}</h1>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <input
                        required
                        type="text"
                        placeholder="Username"
                        onChange={e => this.setState({ username: e.target.value })}
                    />
                    <input
                        required
                        type="password"
                        placeholder="Password"
                        onChange={e => this.setState({ password: e.target.value })}
                    />
                    <button onClick={this.handleSubmit}>
                        Submit
                    </button>
                </form>
                {!!errors.length && errors.map((err, idx) => <li key={`${err}__${idx}`}>{err}</li>)}
            </div>
        );
    }
}
