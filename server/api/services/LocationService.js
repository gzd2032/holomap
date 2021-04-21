

function LocationService(db) {
  async function getAllLocations(db) {
    const data = await db.select('*').from('locations');
    return data;
  }

  async function getLocationsById(db) {
    // const data = await db.select('*').from('locations').where('id', 2);
    // return data;
  }

  async function createLocation(db) {

  }

  async function updateById(db) {

  }

  async function deletebyId(db) {

  }

  return {getAllLocations, getLocationsById, createLocation, updateById, deletebyId}
};

module.exports = LocationService;
