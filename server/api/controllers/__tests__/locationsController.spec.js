/* global describe, beforeEach, jest, it, expect */

const LocationController = require('../locationsController');

const dummyLocations = {
  id: 1,
  name: 'Fort Littel',
  country: 'AM',
  coordinates: '["-10.4356","-49.5316"]',
};

const createMockLocationService = () => ({
  getAllLocations: jest.fn(async () => [dummyLocations]),
  getLocationById: jest.fn(async () => dummyLocations),
  createLocation: jest.fn(async (newLocation) => ({ id: 1, ...newLocation })),
  updateById: jest.fn(async (id, changes) => [id, changes]),
  // eslint-disable-next-line no-unused-vars
  deleteById: jest.fn(async (id) => true),
});

const createMockResponse = () => ({
  send: jest.fn(),
});

describe('Location Controller', () => {
  let locationController;
  let locationService;

  beforeEach(() => {
    locationService = createMockLocationService();
    locationController = LocationController(locationService);
  });

  describe('#index() function', () => {
    it('uses the Location service to find all locations', async () => {
      // Given
      const request = {};
      const response = createMockResponse();

      // When
      await locationController.index(request, response);

      // Then
      expect(locationService.getAllLocations).toHaveBeenCalled();
    });

    it('sends a response', async () => {
      // Given
      const request = {};
      const response = createMockResponse();

      // When
      await locationController.index(request, response);

      // Then
      expect(response.send).toHaveBeenCalled();
    });

    it('the response contains the locations returned from the service', async () => {
      // Given
      const request = {};
      const response = createMockResponse();

      // When
      await locationController.index(request, response);

      // Then
      expect(response.send).toHaveBeenCalledWith([dummyLocations]);
    });
  });

  describe('#findOne method', () => {
    it('calls the location service with the correct id', async () => {
      // Given
      const request = { params: { locationId: 6 } };
      const response = createMockResponse();

      // When
      await locationController.findOne(request, response);

      // Then
      expect(locationService.getLocationById)
        .toHaveBeenCalledWith(6);
    });

    it('sends a response with the location returned by the service', async () => {
      // Given
      const request = { params: { locationId: 6 } };
      const response = createMockResponse();

      // When
      await locationController.findOne(request, response);

      // Then
      expect(response.send).toHaveBeenCalledWith(dummyLocations);
    });
  });

  describe('#save method', () => {
    it('calls the createLocation method on the service', async () => {
      // Given
      const newLocation = {
        name: 'Fort Littel',
        country: 'AM',
        coordinates: '["-10.4356","-49.5316"]',
      };
      const request = { body: newLocation };
      const response = createMockResponse();

      // When
      await locationController.save(request, response);

      // Then
      expect(locationService.createLocation).toHaveBeenCalledWith(newLocation);
    });

    it('sends a response with the newly created location', async () => {
      // Given
      const newLocation = {
        name: 'Fort Littel',
        country: 'AM',
        coordinates: '["-10.4356","-49.5316"]',
      };
      const request = { body: newLocation };
      const response = createMockResponse();
      const savedLocation = expect.objectContaining({
        id: 1,
        ...newLocation,
      });

      // When
      await locationController.save(request, response);

      // Then
      expect(response.send).toHaveBeenCalledWith(savedLocation);
    });
  });

  describe('#update method', () => {
    it('calls the service with the id and the changes', async () => {
      // Given
      const changes = {
        description: 'We are even more awesome now',
      };
      const params = { locationId: 6 };
      const request = { body: changes, params };
      const response = createMockResponse();

      // When
      await locationController.update(request, response);

      // Then
      expect(locationService.updateById)
        .toHaveBeenCalledWith(params.locationId, changes);
    });

    it('sends the response with the updated location', async () => {
      // Given
      const changes = {
        name: 'Fort Awesome',
      };
      const params = { locationId: 6 };
      const request = { body: changes, params };
      const response = createMockResponse();

      // When
      await locationController.update(request, response);

      // Then
      expect(response.send).toHaveBeenCalledWith([6, changes]);
    });
  });

  describe('#destroy method', () => {
    it('call the service with the right id', async () => {
      // Given
      const params = { locationId: 7 };
      const request = { params };
      const response = createMockResponse();

      // When
      await locationController.destroy(request, response);

      // Then
      expect(locationService.deleteById).toHaveBeenCalledWith(7);
    });

    it('sends the response with the result of the deletion', async () => {
      // Given
      const params = { locationId: 7 };
      const request = { params };
      const response = createMockResponse();

      // When
      await locationController.destroy(request, response);

      // Then
      expect(response.send)
        .toHaveBeenCalledWith({ wasDeleted: true });
    });
  });
});
