exports.up = (knex, Promise) => (
    Promise.all([
        knex.schema.createTable('users', (table) => {
            table.increments();
            table.string('username').unique().notNullable();
            table.string('password').notNullable();
            table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
        }),
    ])
);

exports.down = (knex, Promise) => (
    Promise.all([
        knex.schema.dropTable('users'),
    ])
);