import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { animalsQuery } from 'graphql/queries/Animals.graphql';

@graphql(animalsQuery)
export default class Animals extends Component {
    render() {
        console.log(this.props)
        return "Hi";
    }
}