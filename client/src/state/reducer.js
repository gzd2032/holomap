import * as types from './action-types';


export const initialState = {
  // Entities
  utcs: {},
  locations: {},
  relationships: {},

  // UI State
  isWaitingOnInitialLoad: false,

  // Search State
  currentSearchInput: '',
};


export function reducer(state, action) {
  switch (action.type) {
    case types.START_INITIAL_LOAD:
      return {
        ...state,
        isWaitingOnInitialLoad: true,
      };

    case types.FINISH_INITIAL_LOAD:
      return {
        ...state,
        locations: action.payload.locations,
        utcs: action.payload.utcs,
        relationships: action.payload.relationships,

        isWaitingOnInitialLoad: false,
      };

    case types.SEARCH_VALUE_CHANGED:
      return {
        ...state,
        currentSearchInput: action.payload.value,
      };

    case types.NEW_UTC_SAVED:
      const newUTC = action.payload.value;
      return {
        ...state,
        utcs: {
          ...state.utcs,
          [newUTC.id]: newUTC,
        },
      };

    case types.NEW_LOCATION_SAVED:
      const newLocation = action.payload.value;
      return {
        ...state,
        locations: {
          ...state.locations,
          [newLocation.id]: newLocation,
        },
      };

    case types.DELETE_UTC:
      const deletedUTCId = action.payload.value;
      const newUTCs = {
        ...state.utcs,
      }
      delete newUTCs[deletedUTCId]
      return {
        ...state,
        utcs: {
         ...newUTCs,
        },
      }; 

    case types.DELETE_LOCATION:
      const deletedLocationId = action.payload.value;
      const newLocations = {
        ...state.locations,
      }
      delete newLocations[deletedLocationId]
      return {
        ...state,
        locations: {
          ...newLocations,
        },
      };   

    default:
      return state;
  }
}
