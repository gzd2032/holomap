/* global describe, beforeEach, jest, it, expect */

const UTCController = require('../utcController');

const dummyUTC = {
  id: 1,
  unit_type_code: '3kj23',
  nomenclature: 'We get it done',
  description: 'We are awesome',
};

const createMockUTCService = () => ({
  getAllUTCs: jest.fn(async () => [dummyUTC]),
  getUTCById: jest.fn(async () => dummyUTC),
  createUTC: jest.fn(async (newUTC) => ({ id: 1, ...newUTC })),
  updateById: jest.fn(async (id, changes) => [id, changes]),
  // eslint-disable-next-line no-unused-vars
  deleteById: jest.fn(async (id) => true),
});

const createMockResponse = () => ({
  send: jest.fn(),
});

describe('UTC Controller', () => {
  let utcController;
  let utcService;

  beforeEach(() => {
    utcService = createMockUTCService();
    utcController = UTCController(utcService);
  });

  describe('#index() function', () => {
    it('uses the utc service to find all utcs', async () => {
      // Given
      const request = {};
      const response = createMockResponse();

      // When
      await utcController.index(request, response);

      // Then
      expect(utcService.getAllUTCs).toHaveBeenCalled();
    });

    it('sends a response', async () => {
      // Given
      const request = {};
      const response = createMockResponse();

      // When
      await utcController.index(request, response);

      // Then
      expect(response.send).toHaveBeenCalled();
    });

    it('the response contains the utcs returned from the service', async () => {
      // Given
      const request = {};
      const response = createMockResponse();

      // When
      await utcController.index(request, response);

      // Then
      expect(response.send).toHaveBeenCalledWith([dummyUTC]);
    });
  });

  describe('#findOne method', () => {
    it('calls the utc service with the correct id', async () => {
      // Given
      const request = { params: { utcId: 6 } };
      const response = createMockResponse();

      // When
      await utcController.findOne(request, response);

      // Then
      expect(utcService.getUTCById)
        .toHaveBeenCalledWith(6);
    });

    it('sends a response with the utc returned by the service', async () => {
      // Given
      const request = { params: { utcId: 6 } };
      const response = createMockResponse();

      // When
      await utcController.findOne(request, response);

      // Then
      expect(response.send).toHaveBeenCalledWith(dummyUTC);
    });
  });

  describe('#save method', () => {
    it('calls the createUTC method on the service', async () => {
      // Given
      const newUTC = {
        unit_type_code: 'j43j',
        nomenclature: 'We also get it done',
        description: 'We are awesome too',
      };
      const request = { body: newUTC };
      const response = createMockResponse();

      // When
      await utcController.save(request, response);

      // Then
      expect(utcService.createUTC).toHaveBeenCalledWith(newUTC);
    });

    it('sends a response with the newly created utc', async () => {
      // Given
      const newUTC = {
        unit_type_code: 'j43j',
        nomenclature: 'We also get it done',
        description: 'We are awesome too',
      };
      const request = { body: newUTC };
      const response = createMockResponse();
      const savedUTC = expect.objectContaining({
        id: 1,
        ...newUTC,
      });

      // When
      await utcController.save(request, response);

      // Then
      expect(response.send).toHaveBeenCalledWith(savedUTC);
    });
  });

  describe('#update method', () => {
    it('calls the service with the id and the changes', async () => {
      // Given
      const changes = {
        description: 'We are even more awesome now',
      };
      const params = { utcId: 6 };
      const request = { body: changes, params };
      const response = createMockResponse();

      // When
      await utcController.update(request, response);

      // Then
      expect(utcService.updateById)
        .toHaveBeenCalledWith(params.utcId, changes);
    });

    it('sends the response with the updated utc', async () => {
      // Given
      const changes = {
        description: 'We are even more awesome now',
      };
      const params = { utcId: 6 };
      const request = { body: changes, params };
      const response = createMockResponse();

      // When
      await utcController.update(request, response);

      // Then
      expect(response.send).toHaveBeenCalledWith([6, changes]);
    });
  });

  describe('#destroy method', () => {
    it('call the service with the right id', async () => {
      // Given
      const params = { utcId: 7 };
      const request = { params };
      const response = createMockResponse();

      // When
      await utcController.destroy(request, response);

      // Then
      expect(utcService.deleteById).toHaveBeenCalledWith(7);
    });

    it('sends the response with the result of the deletion', async () => {
      // Given
      const params = { utcId: 7 };
      const request = { params };
      const response = createMockResponse();

      // When
      await utcController.destroy(request, response);

      // Then
      expect(response.send)
        .toHaveBeenCalledWith({ wasDeleted: true });
    });
  });
});
