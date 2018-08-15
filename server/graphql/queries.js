const {
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    GraphQLID,
} = require('graphql');
const { getUsers } = require('../modules/user/handlers');
const { UserType } = require('../graphql/types');
const { isAuthorized } = require('../middleware');

const animals = {
    0: {
        id: 0,
        name: "Fluffykins.",
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
        resolve: (parent, { id }, { req }) => (
            isAuthorized(
                req,
                () => animals[id],
            )
        ),
    },
    animals: {
        type: AnimalType,
        resolve: (parent, _, { req }) => (
            isAuthorized(
                req,
                () => animals,
            )
        ),
    },
    users: {
        type: GraphQLList(UserType),
        resolve: getUsers,
    },
    me: {
        type: UserType,
        resolve: (parent, _, { req }) => {
            if (req.session.user && req.session.user.id) {
                return {
                    id: req.session.user.id,
                    username: req.session.user.username,
                    isAuthenticated: true,
                };
            }
            return {
                id: null,
                username: null,
                isAuthenticated: false,
            };
        },
    },
};

module.exports = Queries;
