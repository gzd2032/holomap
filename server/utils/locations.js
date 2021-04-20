function transformCoordinates(coordinates) {
  return coordinates.map(point => parseFloat(point));
}

function transformLocation(location) {
  return {
    id: location.id,
    name: location.name,
    country: location.country,
    coordinates: transformCoordinates(JSON.parse(location.coordinates)),
  };
}

module.exports = {
  transformLocation,
};
