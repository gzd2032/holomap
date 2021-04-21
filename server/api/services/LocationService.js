
function LocationService(db) {
  async function getAllLocations() {
    const data = await db.select('*').from('locations');
    return data;
  }

<<<<<<< HEAD
  async function getLocationById(id) {
=======
  async function getLocationsById(id) {
>>>>>>> 9f3e88b82a7839abe828b5bccd0cf0d67197ad43
    const data = await db.first('*').from('locations').where('id', id);
    return data;
  }

  async function createLocation(location) {
    const idArray = await db.insert(location).into('locations');
    const newId = idArray[0];
    const data = await db.first('*').from('locations').where('id', newId);
    return data;
  }

  async function updateById(id, newItem) {
    await db.from('locations').where('id', id).update(newItem);
    const data = await db.first('*').from('locations').where('id', id);
    return data;
  }

  async function deleteById(id) {
    const affectedRows = await db.from('locations').where('id', id).del();
    return affectedRows > 0;
  }

<<<<<<< HEAD
  return {getAllLocations, getLocationById, createLocation, updateById, deleteById}
=======
  return {getAllLocations, getLocationsById, createLocation, updateById, deleteById}
>>>>>>> 9f3e88b82a7839abe828b5bccd0cf0d67197ad43
};

module.exports = LocationService;
