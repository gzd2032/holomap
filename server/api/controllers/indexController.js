const { transformLocation } = require('../../utils/locations');

function IndexController(locationService, utcService, db) {
  async function index(req, res) {
    const locations = await locationService.getAllLocations();
    const utcs = await utcService.getAllUTCs();
    const locationUTCs = await db('locations_utcs').select();

    const relationships = locationUTCs.reduce((result, row) => {
      if (!result[row.location_id]) {
        // eslint-disable-next-line no-param-reassign
        result[row.location_id] = [];
      }

      result[row.location_id].push(row.utc_id);

      return result;
    }, {});

    const transformedLocations = locations.map(transformLocation);
    return res.json({
      locations: transformedLocations,
      utcs,
      relationships,
    });
  }

  return { index };
}

module.exports = IndexController;
