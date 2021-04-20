const { transformLocation } = require('../utils/locations');

function indexController(db) {
  async function index(req, res) {
    const locations = await db('locations').select();
    
    const transformedLocations = locations.map(transformLocation); 

    return res.json({ locations: transformedLocations });
  }

  return { index };
}

module.exports = indexController;
