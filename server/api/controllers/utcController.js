module.exports = (utcService) => ({
  /**
   * GET /utcs
   */
  async index(request, response) {
    response.send(await utcService.getAllUTCs());
  },

  /**
   * GET /utcs/:utcId
   */
  async findOne(request, response) {
    const utc = await utcService.getUTCById(request.params.utcId);

    response.send(utc);
  },

  /**
   * POST /utcs
   */
  async save(request, response) {
    const savedUTC = await utcService.createUTC(request.body);

    response.send(savedUTC);
  },

  /**
   * PATCH /utcs/:utcId
   */
  async update(request, response) {
    const { params, body } = request;

    const updatedUTC = await utcService.updateById(params.utcId, body);

    response.send(updatedUTC);
  },

  /**
   * DELETE /utcs/:utcId
   */
  async destroy(request, response) {
    const wasDeleted = await utcService.deleteById(request.params.utcId);

    response.send({ wasDeleted });
  },
});
