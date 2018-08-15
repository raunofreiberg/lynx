const { GraphQLString } = require('graphql');
const { compare } = require('bcrypt');
const { getUser, insertUser } = require('../modules/user/handlers');
const { UserType } = require('../graphql/types');

const Mutations = {
    register: {
        type: UserType,
        args: {
            username: { type: GraphQLString },
            password: { type: GraphQLString },
        },
        resolve: async (parent, { username, password }, { req }) => {
            const doesUserExist = !!await getUser(username);

            if (doesUserExist) {
                return Promise.reject(new Error('User exists'));
            }

            const [user] = await insertUser(username, password);

            if (user) {
                req.session.user = user;
            }

            return user;
        },
    },
    login: {
        type: UserType,
        args: {
            username: { type: GraphQLString },
            password: { type: GraphQLString },
        },
        resolve: async (parent, { username, password }, { req }) => {
            const user = await getUser(username);

            if (!user) {
                return new Error('User not found');
            }

            const arePasswordsEqual = await compare(password, user.password);

            if (!arePasswordsEqual) {
                return new Error('Wrong password');
            }

            // Get rid of the password to prepare for the response.
            const { password: _, ...rest } = user;

            req.session.user = {
                ...rest,
            };
            return rest;
        },
    },
    logout: {
        type: UserType,
        resolve: async (parent, _, { req }) => {
            req.session.destroy();
        },
    },
};

module.exports = Mutations;
