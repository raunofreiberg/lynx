const {
    GraphQLString,
    GraphQLObjectType,
    GraphQLID,
} = require('graphql');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
    }),
});

module.exports = UserType;
