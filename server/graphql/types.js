const {
    GraphQLString,
    GraphQLObjectType,
    GraphQLID,
    GraphQLBoolean,
} = require('graphql');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        isAuthenticated: { type: GraphQLBoolean },
    }),
});

module.exports = {
    UserType,
};
