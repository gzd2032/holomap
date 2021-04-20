const { transformLocation } = require('../utils/locations');

function IndexController(db) {
  async function index(req, res) {
    const locations = await db.select().from('locations');
    const utcs = await db.select().from('utcs');
    const transformedLocations = locations.map(transformLocation); 

    return res.json({
      locations: transformedLocations,
      utcs,
    });
  }

  return { index };
}

module.exports = IndexController;
