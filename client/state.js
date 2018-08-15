import { withClientState } from 'apollo-link-state';
import userQuery from 'graphql/queries/CurrentUser.graphql';

const initialState = {
    user: {
        __typename: 'CurrentUser',
        username: 'Unknown',
        id: null,
    },
};

export default (cache) => (
    withClientState({
        cache,
        defaults: initialState,
        resolvers: {
            Mutation: {
                setUser: (_, { username, id }, { cache }) => {
                    const prevState = cache.readQuery({ query: userQuery });
                    const data = {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            username,
                            id,
                        },
                    };

                    cache.writeData({ data });
                    return null;
                },
            },
        },
    })
);
