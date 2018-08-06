const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const Mutations = require('./graphql/mutations');
const Queries = require('./graphql/queries');

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQuery',
        fields: Queries,
    }),
    mutation: new GraphQLObjectType({
        name: 'RootMutation',
        fields: Mutations,
    }),
});
