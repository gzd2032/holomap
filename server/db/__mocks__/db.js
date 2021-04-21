/* global jest */
const _ = require('lodash');

const CreateDBMock = jest.fn(() => {
  const tables = {
    locations: [],
    utcs: [],
    locations_utcs: [],
  };

  const mockLocations = [{
      id: 1,
      name: 'Fort Littel',
      country: 'AM',
      coordinates: '["-10.4356","-49.5316"]',
    },
    {
      id: 2,
      name: 'Fort Wayne',
      country: 'EE',
      coordinates: '["-10.1234","-49.536"]',
    },
    {
      id: 3,
      name: 'Fort Campbell',
      country: 'AJ',
      coordinates: '["-10.6789","-49.516"]',
    },
  ];

  const db = {
    select: async () => db,
    insert: async (data) => {
      db.currentInsertion = _.isArray(data) ? data : [data];
      return db;
    },
    into: async (table) => {
      tables[table] = tables[table].concat(db.currentInsertion);
      db.currentInsertion = null;
      return db;
    },
    from: async (table) => {
      db.currentTable = tables[table];
      return db;
    },
    where: async (column, id) => {
      db.currentResult = db.mockLocations.find((location) => location[column] === id);
      return db;
    },
    del: async () => {
      tables.locations = [];
      tables.utcs = [];
      tables.locations_utcs = [];
      return db;
    },
    then: async () => {
      const sendResult = db.currentResult;
      db.currentResult = null;
      return sendResult;
    },
    currentInsertion: null,
    currentResult: null,
  };

  return db;
});

module.exports = CreateDBMock();