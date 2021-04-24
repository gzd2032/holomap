// indexController fetch
export function indexController() {
  return fetch('http://localhost:8080', {
    mode: 'cors',
  })
    .then(response => response.json());
}

// getAllLocations fetch
export function getAllLocations() {
    return fetch('http://localhost:8080/locations')
    .then(response => response.json());
}

// getAllLocationById fetch
export function getLocationById(id) {
  return fetch(`http://localhost:8080/locations/${id}`)
    .then(response => response.json());
}

//  createLocation fetch
export function createLocation(newLocation) {
    const [lat, long] = newLocation.coordinates.split(',');
    
    return fetch('http://localhost:8080/locations', {
      method: 'POST',
      body: JSON.stringify({
        ...newLocation,
        coordinates: `["${lat}", "${long}"]`
      }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json());
  }
  
  //  updateLocationbyID fetch
export function updateLocationById(id, updatedLocation) {
  const [lat, long] = updatedLocation.coordinates.split(',');
  
  return fetch(`http://localhost:8080/locations/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      ...updatedLocation,
      coordinates: `["${lat}", "${long}"]`
    }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(response => response.json());
}
// deleteByID
export function deleteLocationById(id) {
    return fetch(`http://localhost:8080/locations/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json());
  }


// getAllUTCs fetch
export function getAllUTCs() {
    return fetch('http://localhost:8080/utcs')
    .then(response => response.json());
}

// getAllUTCById fetch
export function getUTCsById(id) {
  return fetch(`http://localhost:8080/utcs/${id}`)
    .then(response => response.json());
}

//  createUTC fetch
export function createUTC(newUTC) {
    return fetch('http://localhost:8080/utcs', {
      method: 'POST',
      body: JSON.stringify(newUTC),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json());
  }

//  updateUTCbyID fetch
export function updateUTCById(id, changes) {
  return fetch(`http://localhost:8080/utcs/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(changes),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(response => response.json());
}

export function deleteUTCById(id) {
    return fetch(`http://localhost:8080/utcs/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json());
  }
