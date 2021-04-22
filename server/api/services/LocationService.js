function LocationService(db) {
  async function getAllLocations() {
    const data = await db.select('*').from('locations');
    return data;
  }

  async function getLocationById(id) {
    const locationData = await db.first('*').from('locations').where('id', id);
    if (!locationData) return undefined;
    const utcs = await db.select()
      .from('utcs')
      .join('locations_utcs', 'locations_utcs.utc_id', 'utcs.id')
      .where('locations_utcs.location_id', id);
    return Object.assign(locationData, { utcs });
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

  return {
    getAllLocations,
    getLocationById,
    createLocation,
    updateById,
    deleteById,
  };
}

module.exports = LocationService;
