/* global describe, beforeEach, afterEach, it, expect */
const IndexController = require('../indexController');
const mockKnex = require('../../db');
jest.mock('../../db');

describe('The index controller', () => {
  const knex = mockKnex();
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

  it('should pass because this is a fake test', () => {
    expect(typeof indexController.index).toBe('function');
  });
});
