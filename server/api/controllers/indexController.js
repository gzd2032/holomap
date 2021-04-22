const { transformLocation } = require('../../utils/locations');

function IndexController(locationService, utcService) {
  async function index(req, res) {
    const locations = await locationService.getAllLocations();
    const utcs = await utcService.getAllUTCs();
    const transformedLocations = locations.map(transformLocation);

    return res.json({
      locations: transformedLocations,
      utcs,
    });
  }

  return { index };
}

module.exports = IndexController;
