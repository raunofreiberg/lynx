import React, { Component } from 'react';
import { getItemFromStorage } from 'utils/localStorage';

export default function (ComposedComponent) {
    class PersistRoute extends Component {
        componentDidMount() {
            if (getItemFromStorage('currentUser')) {
                this.props.history.push('/');
            }
        }

        componentDidUpdate() {
            if (getItemFromStorage('currentUser')) {
                this.props.history.push('/');
            }
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    return PersistRoute;
}
