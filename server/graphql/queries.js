const {
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    GraphQLID,
} = require('graphql');
const { queryUsers } = require('../modules/user/handlers');
const UserType = require('../modules/user/userType');

const animals = {
    0: {
        id: 0,
        name: "Fluffykins",
        abilities: [],
    },
    1: {
        id: 1,
        name: "Taro",
        abilities: ['breathe fire, play around, chill'],
    },
};

const AnimalType = new GraphQLObjectType({
    name: 'Animal',
    description: 'This is an animal',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        abilities: { type: GraphQLList(GraphQLString) },
    }),
});

const Queries = {
    animal: {
        type: AnimalType,
        args: { id: { type: GraphQLID } },
        resolve: (parent, { id }, { req }) => {
            if (!req.session.userId) {
                return new Error('oh fuck');
            }
            return animals[id];
        },
    },
    users: {
        type: GraphQLList(UserType),
        resolve: queryUsers,
    },
};

module.exports = Queries;
