/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('locations_utcs', (table) => {
    table.increments('id').primary();
    table.integer('location_id').unsigned();
    table.foreign('location_id').references('locations.id');
    table.integer('utc_id').unsigned();
    table.foreign('utc_id').references('utcs.id');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('locations_utcs');
};
