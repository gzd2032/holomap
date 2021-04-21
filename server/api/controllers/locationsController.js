module.exports = (locationService) => ({
  /**
   * GET /locations
   */
  async index(request, response) {
    response.send(await locationService.getAllLocations());
  },

  /**
   * GET /location/:locationId
   */
  async findOne(request, response) {
    const location = await locationService.getLocationById(request.params.locationId);

    response.send(location);
  },

  /**
   * POST /locations
   */
  async save(request, response) {
    const savedLocation = await locationService.createLocation(request.body);

    response.send(savedLocation);
  },

  /**
   * PATCH /location/:locationId
   */
  async update(request, response) {
    const { params, body } = request;

    const updatedLocation = await locationService.updateById(params.locationId, body);

    response.send(updatedLocation);
  },

  /**
   * DELETE /location/:locationId
   */
  async destroy(request, response) {
    const wasDeleted = await locationService.deleteById(request.params.locationId);

    response.send({ wasDeleted });
  },
});
