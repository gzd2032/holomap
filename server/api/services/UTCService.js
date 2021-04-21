module.exports = (db) => ({
  getAllUTCs() {
    return db
      .select('*')
      .from('utcs');
  },

  getUTCById(id) {
    return db
      .first('*')
      .from('utcs')
      .where('id', id);
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
