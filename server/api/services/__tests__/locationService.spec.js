/* global jest, describe, it, expect, beforeEach */

// jest.mock('../../../db/db');
const LocationService = require('../LocationService');
const db = require('../../../db/db');

describe('This is the intial test', () => {
  let locationService = null;
  const mockLocation = [{
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
  beforeEach( async () => {
    await db.insert(mockLocation).into('locations');
    locationService = LocationService(db);
  });

  afterEach( async () => {
    await db.del();
  });

  it('LocationService should be a function', () => {
    expect(typeof locationService.getAllLocations).toBe('function');
  });

  it('getAllLocations function should return a list of locations', async () => {
    const results = await locationService.getAllLocations();
    expect(results.length).toBe(3);
  });
  it('getLocationsById function should return a location by ID', async () => {
    const locationById = await locationService.getLocationsById(db, 2);
    expect(locationById.id).toBe(2);
  });
});
