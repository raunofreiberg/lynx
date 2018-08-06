const express = require('express');
const redis = require('redis');
const graphqlHTTP = require('express-graphql');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const schema = require('./schema');

const app = express();
const client = redis.createClient();
const port = process.env.PORT || 3000;

app.use(session({
    name: 'yolo',
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new RedisStore({
        host: 'localhost',
        port: 6379,
        client,
        ttl: 260,
    }),
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
}));

app.use(
    '/graphql',
    graphqlHTTP(req => ({
        schema,
        graphiql: true,
        context: { req },
    })),
);

app.listen(
    port,
    () => console.log(`Running at port: ${port}`),
);
