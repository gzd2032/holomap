import * as types from './action-types';


function createIndexedObjectFromArray(key, array) {
  return array.reduce((result, currentItem) => {
    result[currentItem[key]] = currentItem;
    return result;
  }, {});
}

export function startInitialLoad() {
  return {
    type: types.START_INITIAL_LOAD,
  };
}

export function finishInitialLoad({ locations, utcs, relationships }) {
  return {
    type: types.FINISH_INITIAL_LOAD,
    payload: {
      relationships,
      utcs: createIndexedObjectFromArray('id', utcs),
      locations: createIndexedObjectFromArray('id', locations),
    },
  };
}

export function searchValueChanged(currentValue) {
  return {
    type: types.SEARCH_VALUE_CHANGED,
    payload: {
      value: currentValue,
    },
  };
}

export function newUtcSaved(newUTC) {
  return {
    type: types.NEW_UTC_SAVED,
    payload: {
      value: newUTC,
    },
  };
}

export function newLocationSaved(newLocation) {
  return {
    type: types.NEW_LOCATION_SAVED,
    payload: {
      value: newLocation,
    },
  };
}