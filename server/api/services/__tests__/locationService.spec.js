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
    await db.from('locations').truncate();
    await db.insert(mockLocation).into('locations');
    locationService = LocationService(db);
  });

  afterEach( async () => {
    await db.from('locations').truncate();
  });

  it('LocationService should be a function', () => {
    expect(typeof locationService.getAllLocations).toBe('function');
  });

  it('getAllLocations function should return a list of locations', async () => {
    const results = await locationService.getAllLocations();
    expect(results.length).toBe(3);
  });

  it('getLocationsById function should return a location by ID', async () => {
    const location = await locationService.getLocationsById(2);
    expect(location.id).toBe(2);
  });

  it('should create a new location', async () => {
    const newLocation = {
      name: 'Fort Kentucky',
      country: 'AK',
      coordinates: '["5.6789","39.516"]',
    };
    const location = await locationService.createLocation(newLocation);
    expect(location.id).toBe(4);
  });

  it('Should update a location by ID', async () => {
    const updateRecord = {
      name: 'Fort Gordon',
      country: 'DE',
      coordinates: '["5.6789","39.516"]',
    };
    const newRecord = await locationService.updateById(1, updateRecord);
    expect(newRecord).toEqual({ ...updateRecord, id: 1 });
  });

  it('Should delete a location by ID', async () => {
    const result = await locationService.deleteById(1);
    expect(result).toEqual(true);
  });
});
