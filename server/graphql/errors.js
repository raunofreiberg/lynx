const { createError } = require('apollo-errors');

const AuthorizationError = createError('Unauthorized', {
    message: 'You are unauthorized',
});

module.exports = {
    AuthorizationError,
};
