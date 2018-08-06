const { hash } = require('bcrypt');
const db = require('../../db');

const queryUser = username => db('users').where({ username }).first();
const queryUsers = () => db('users');

const insertUser = async (username, password) => {
    const hashedPassword = await hash(password, 12);
    const user = await queryUser(username);

    if (user) {
        return Promise.reject(new Error("User exists"));
    }

    return db('users')
        .insert({
            username,
            password: hashedPassword,
        })
        .returning(['id', 'username', 'created_at']);
};

module.exports = {
    queryUser,
    queryUsers,
    insertUser,
};
