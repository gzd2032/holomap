
function LocationService(db) {
  async function getAllLocations() {
    const data = await db.select('*').from('locations');
    return data;
  }

  async function getLocationsById(id) {
    const data = await db.select('*').from('locations').where('id', 2);
    return data;
  }

  async function createLocation() {

  }

  async function updateById() {

  }

  async function deletebyId() {

  }

  return {getAllLocations, getLocationsById, createLocation, updateById, deletebyId}
};

module.exports = LocationService;
