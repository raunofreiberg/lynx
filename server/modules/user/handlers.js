const { hash } = require('bcrypt');
const db = require('../../db');

const WHITELISTED_ATTRIBUTES = [
    'id',
    'username',
    'created_at',
];

const getUser = username => db('users').where({ username }).first();
const getUsers = () => db('users');

const insertUser = async (username, password) => {
    const hashedPassword = await hash(password, 12);

    return db('users')
        .insert({
            username,
            password: hashedPassword,
        })
        .returning(WHITELISTED_ATTRIBUTES);
};

module.exports = {
    getUser,
    getUsers,
    insertUser,
};
