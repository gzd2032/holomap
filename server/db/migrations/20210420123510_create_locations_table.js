/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('locations', (table) => {
    table.increments('id').primary();
    table.string('name', 250).notNullable().unique();
    table.string('country', 250).notNullable();
    table.json('coordinates').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('locations');
};
