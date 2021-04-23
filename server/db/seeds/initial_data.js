/* eslint-disable no-await-in-loop, no-use-before-define, no-restricted-syntax */

const _ = require('lodash');
const faker = require('faker');

let LOCATION_SEED_COUNT = 30;
let UTC_SEED_COUNT = 100;

exports.seed = async function seed(knex) {
  await seedLocations(knex);
  await seedUtc(knex);
  const locationsIds = await knex('locations').pluck('id');
  const utcsIds = await knex('utcs').pluck('id');
  await seedLocationsUtcs(knex, locationsIds, utcsIds);
};

async function seedLocations(knex) {
  await knex('locations').truncate();

  while (LOCATION_SEED_COUNT > 0) {
    await knex('locations').insert({
      name: `Fort ${faker.unique(faker.name.lastName)}`,
      country: faker.address.countryCode(),
      coordinates: JSON.stringify([
        faker.address.latitude(),
        faker.address.longitude(),
      ]),
    });
    LOCATION_SEED_COUNT -= 1;
  }
}

async function seedUtc(knex) {
  await knex('utcs').truncate();

  while (UTC_SEED_COUNT > 0) {
    await knex('utcs').insert({
      unit_type_code: faker.unique(faker.random.alphaNumeric, [5]),
      category: faker.random.arrayElement(['Support', 'Equipment Only', 'BOSI', 'Mission']),
      nomenclature: faker.company.catchPhrase(),
      description: faker.company.bs(),
    });
    UTC_SEED_COUNT -= 1;
  }
}

async function seedLocationsUtcs(knex, allLocationIds, allUtcsIds) {
  const possibleUtcOptions = _.range(1, 11);

  await knex('locations_utcs').truncate();

  for (const locationId of allLocationIds) {
    const numberOfUtcs = _.sample(possibleUtcOptions);
    const randomUtcIds = _.sampleSize(allUtcsIds, numberOfUtcs);
    for (const randomUtcId of randomUtcIds) {
      await knex('locations_utcs').insert({
        location_id: locationId,
        utc_id: randomUtcId,
      });
    }
  }
}
