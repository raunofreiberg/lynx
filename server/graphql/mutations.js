const { GraphQLString } = require('graphql');
const { compare } = require('bcrypt');
const { queryUser, insertUser } = require('../modules/user/handlers');
const UserType = require('../modules/user/userType');

const Mutations = {
    register: {
        type: UserType,
        args: {
            username: { type: GraphQLString },
            password: { type: GraphQLString },
        },
        resolve: async (parent, { username, password }, { req }) => {
            const user = await insertUser(username, password);

            if (user) {
                req.session.userId = user[0].id;
            }

            return user[0];
        },
    },
    login: {
        type: UserType,
        args: {
            username: { type: GraphQLString },
            password: { type: GraphQLString },
        },
        resolve: async (parent, { username, password }, { req }) => {
            const user = await queryUser(username);

            if (!user) {
                return new Error('User not found');
            }

            const arePasswordsEqual = await compare(password, user.password);

            if (!arePasswordsEqual) {
                return new Error('Wrong password');
            }

            req.session.userId = user.id;
            return user;
        },
    },
    logout: {
        type: UserType,
        resolve: async (parent, _, { req }) => req.session.destroy(),
    },
};

module.exports = Mutations;
