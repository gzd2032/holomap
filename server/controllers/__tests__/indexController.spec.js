/* global describe, beforeEach, afterEach, it, expect */
jest.mock('../../db/db');
const IndexController = require('../indexController');
const knex = require('../../db/db');

describe('The index controller', () => {
  let indexController = null;
  const mockLocation = {
    id: 1,
    name: 'Fort Littel',
    country: 'AM',
    coordinates: '["-10.4429","-49.5316"]',
  };
  const mockUTC = {
    id: 1,
    unit_type_code: 'zudkp',
    category: 'Equipment Only',
    nomenclature: 'Front-line 24 hour superstructure',
    description: 'streamline cutting-edge solutions',
  };
  beforeEach(async () => {
    await knex.insert(mockLocation).into('locations');
    await knex.insert(mockUTC).into('utcs');
    indexController = IndexController(knex);
  });

  afterEach(() => {
    knex.del();
  });

  test('knex.select should be a mock function', () => {
    expect(typeof knex.select).toBe('function');
  });
});
