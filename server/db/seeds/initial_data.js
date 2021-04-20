const faker = require('faker');

let LOCATION_SEED_COUNT = 10;

exports.seed = async function(knex) {
  await seedLocations(knex);
};

async function seedLocations(knex) {
  await knex('locations').del();

  while (LOCATION_SEED_COUNT-- > 0) {
    // eslint-disable-next-line no-await-in-loop
    await knex('locations').insert({
      name: `Fort ${faker.unique(faker.name.lastName)}`,
      country: faker.address.countryCode(),
      coordinates: JSON.stringify([
        faker.address.latitude(),
        faker.address.longitude(),
      ]),
    });
  }
}
