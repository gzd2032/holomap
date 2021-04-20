/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('utcs', (table) => {
    table.increments('id').primary();
    table.string('unit_type_code', 10).notNullable().unique();
    table.string('category', 100).notNullable();
    table.string('nomenclature').notNullable();
    table.string('description', 255);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('utcs');
};
