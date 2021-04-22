/* global jest, describe, beforeEach, afterEach, it, expect */
jest.mock('../../../db/db');
const db = require('../../../db/db');
const IndexController = require('../indexController');

const UTCService = require('../../services/UTCService');
const LocationService = require('../../services/LocationService');
const utcService = UTCService(db);
const locationService = LocationService(db);

const createMockResponse = () => ({
  send: jest.fn(),
  json: (data) => data,
});

describe('The index controller', () => {
  let indexController = null;
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

  const mockUTCs = [
    {
      id: 1,
      unit_type_code: '3kj23',
      nomenclature: 'We get it done',
      description: 'We are awesome',
      category: 'Supply',
    },
    {
      id: 2,
      unit_type_code: '54lkj',
      nomenclature: 'We get it done better',
      description: 'We are more awesome than the other guys',
      category: 'BOSI',
    },
  ];
  beforeEach(async () => {
    await db.insert(mockLocations).into('locations');
    await db.insert(mockUTCs).into('utcs');
    indexController = IndexController(locationService, utcService);
  });

  afterEach(async () => {
    await db.del();
  });

  it('should be a mock function', () => {
    expect(typeof db.select).toBe('function');
  });

  it('should return all utcs and locations', async () => {
    const request = {};
    const response = createMockResponse();

    expect(db.insert).toHaveBeenCalled();
    const data = await indexController.index(request, response);
    expect(db.select).toHaveBeenCalled();
    expect(data.locations.length).toBe(3);
    expect(data.utcs.length).toBe(2);
  });
});
