/* global describe, beforeEach, it, expect */

const UTCService = require('../UTCService');
const db = require('../../../db/db');

describe('UTC Service', () => {
  const utcService = UTCService(db);

  const dummyUTCs = [
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
    await db('utcs').truncate();
    await db('utcs').insert(dummyUTCs);
  });

  describe('#getAllUTCs method', () => {
    it('should return all of the utcs', async () => {
      // When
      const result = await utcService.getAllUTCs();

      // Then
      expect(result).toEqual(dummyUTCs);
    });
  });

  describe('#getUTCById method', () => {
    it('should return the utc that has the provided id', async () => {
      // Given
      const { id } = dummyUTCs[0];

      // When
      const result = await utcService.getUTCById(id);

      // Then
      expect(result).toEqual(dummyUTCs[0]);
    });

    it('should return nothing if no utc was found', async () => {
      // Given
      const id = 455354354353;

      // When
      const result = await utcService.getUTCById(id);

      // Then
      expect(result).toBeUndefined();
    });
  });

  describe('#createUTC', () => {
    it('should create a new utc', async () => {
      // Given
      const newUTC = {
        unit_type_code: 'k342j',
        nomenclature: 'Some thing',
        description: 'Some other thing',
        category: 'Supply',
      };

      // Given
      const result = await utcService.createUTC(newUTC);

      // Then
      expect(result).toEqual({
        id: 3,
        ...newUTC,
      });
    });
  });

  describe('#updateById', () => {
    it('should update the UTC with the given id', async () => {
      // Given
      const { id } = dummyUTCs[0];
      const changes = { description: 'I am new' };

      // Given
      const result = await utcService.updateById(id, changes);

      // Then
      expect(result).toEqual({
        ...dummyUTCs[0],
        ...changes,
      });
    });
  });

  describe('#deleteById', () => {
    it('should delete the UTC with the given id', async () => {
      // Given
      const { id } = dummyUTCs[0];

      // When
      await utcService.deleteById(id);

      const deletedUTC = await db('utcs')
        .first()
        .where('id', id);

      // Then
      expect(deletedUTC).toBeUndefined();
    });
  });
});
