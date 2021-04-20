const _ = require('lodash');

const CreateKnexMock = () => {
  const tables = {
    locations: [],
    utcs: [],
    locations_utcs: [],
  };

  const knex = {
    select: () => knex,
    insert: (data) => {
      knex.currentInsertion = _.isArray(data) ? data : [data];
      return knex;
    },
    into: async (table) => {
      tables[table] = tables[table].concat(knex.currentInsertion);
      knex.currentInsertion = null;
    },
    from: async (table) => tables[table],
    del: () => {
      tables.locations = [];
      tables.utcs = [];
      tables.locations_utcs = [];
      return knex;
    },
    currentInsertion: null,
  };

  return knex;
};

module.exports = CreateKnexMock;