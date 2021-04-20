/* global jest */
const _ = require('lodash');

const CreateDBMock = jest.fn(() => {
  const tables = {
    locations: [],
    utcs: [],
    locations_utcs: [],
  };

  const db = {
    select: () => db,
    insert: (data) => {
      db.currentInsertion = _.isArray(data) ? data : [data];
      return db;
    },
    into: async (table) => {
      tables[table] = tables[table].concat(db.currentInsertion);
      db.currentInsertion = null;
    },
    from: async (table) => tables[table],
    del: () => {
      tables.locations = [];
      tables.utcs = [];
      tables.locations_utcs = [];
      return db;
    },
    currentInsertion: null,
  };

  return db;
});

module.exports = CreateDBMock();