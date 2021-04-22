/* global jest */
const _ = require('lodash');

const CreateDBMock = jest.fn(() => {
  const tables = {
    locations: [],
    utcs: [],
    locations_utcs: [],
  };

  let selectedTable = null;
  let currentInsertion = null;
  let currentResult = null;

  const mockSelect = jest.fn();
  const mockInsert = jest.fn();
  const mockInto = jest.fn();
  const mockFrom = jest.fn();
  const mockWhere = jest.fn();
  const mockDel = jest.fn();

  const db = {
    select: mockSelect,
    insert: mockInsert,
    into: mockInto,
    from: mockFrom,
    where: mockWhere,
    del: mockDel,
    currentInsertion: null,
    currentResult: null,
    currentTable: null,
    raw: jest.fn().mockReturnThis(),
    then: jest.fn((done) => {
      done(selectedTable);
    }),
  };

  mockSelect.mockImplementation(() => db);
  mockInsert.mockImplementation((data) => {
    currentInsertion = _.isArray(data) ? data : [data];
    return db;
  });
  mockInto.mockImplementation((table) => {
    tables[table] = tables[table].concat(currentInsertion);
    currentInsertion = null;
    return db;
  });
  mockFrom.mockImplementation((table) => {
    selectedTable = tables[table];
    return db;
  });
  mockWhere.mockImplementation((column, id) => {
    currentResult = selectedTable.find((location) => location[column] === id);
    console.log(currentResult);
    return db;
  });
  mockDel.mockImplementation(() => {
    tables.locations = [];
    tables.utcs = [];
    tables.locations_utcs = [];
    return db;
  });

  return db;
});

module.exports = CreateDBMock();
