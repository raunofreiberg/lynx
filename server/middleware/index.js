const { AuthorizationError } = require('../graphql/errors');

const isAuthorized = (req, controller) => {
    if (req.session.user && req.session.user.id) {
        return controller.apply(this);
    }
    throw new AuthorizationError();
};

module.exports = {
    isAuthorized,
};
