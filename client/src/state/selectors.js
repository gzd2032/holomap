// selectors are helper functions for getting state
export function selectAllLocations(state) {
  return Object.values(state.locations);
}

export function selectLocationById(id, state) {
  return state.locations[id];
}

export function selectUTCSForLocation(locationId, state) {
  const utcIds = state.relationships[locationId] || [];

  return utcIds.map(utcId => state.utcs[utcId]);
}

export function selectAllUTCS(state) {
  return Object.values(state.utcs);
}

export function selectUTCByID(id, state) {
  return state.utcs[id];
}

export function selectLocationsForUTC(utcId, state) {
  const relevantLocations = [];

  for (const [locationId, utcIds] of Object.entries(state.relationships)) {
    if (utcIds.includes(utcId)) {
      relevantLocations.push(state.locations[locationId]);
    }
  }

  return relevantLocations;
}

export function selectLocationsAndUTCSThatMatchSearch(state) {
  const search = state.currentSearchInput.toLowerCase();

  const allUTCs = selectAllUTCS(state);
  const allLocations = selectAllLocations(state);

  const filteredUTCs = allUTCs.filter((utc) => {
    const includesUTC = utc.unit_type_code
      .toLowerCase()
      .includes(search);

    const includesCategory = utc.category
      .toLowerCase()
      .includes(search);

    return includesUTC || includesCategory;
  });

  const filteredLocations = allLocations.filter((location) => {
    const includesName = location.name
      .toLowerCase()
      .includes(search);

    const includesCountry = location.country
      .toLowerCase()
      .includes(search);

    return includesName || includesCountry;
  });

  return {
    utcs: filteredUTCs,
    locations: filteredLocations,
  };
}
