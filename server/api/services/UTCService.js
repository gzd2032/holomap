module.exports = (db) => ({
  getAllUTCs() {
    return db
      .select('*')
      .from('utcs');
  },

  async getUTCById(id) {
    const utc = await db
      .first('*')
      .from('utcs')
      .where('id', id);
    const locations = await db.select().from('locations').join('locations_utcs', 'locations_utcs.location_id', 'locations.id').where('locations_utcs.utc_id', id);
    if (utc) {
      utc['locations'] = locations;
      return utc;
    }
    return utc;
  },

  async createUTC(newUTC) {
    const [id] = await db
      .insert(newUTC)
      .into('utcs');

    return db
      .first('*')
      .from('utcs')
      .where('id', id);
  },

  async updateById(id, changes) {
    await db('utcs')
      .where('id', id)
      .update(changes);

    return db
      .first('*')
      .from('utcs')
      .where('id', id);
  },

  deleteById(id) {
    return db
      .from('utcs')
      .where('id', id)
      .delete();
  },
});
