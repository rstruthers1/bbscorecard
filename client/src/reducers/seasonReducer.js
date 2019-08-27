import {
  ADD_SEASON_SUCCESS,
  ADD_SEASON_FAILURE,
  GET_SEASON_SUCCESS,
  GET_SEASON_FAILURE,
  GET_SEASONS_SUCCESS,
  GET_SEASONS_FAILURE,
  UPDATE_SEASON_SUCCESS,
  UPDATE_SEASON_FAILURE
} from '../actions/types';

const initialState = {
  season: null,
  seasons: null,
  loading: true,
  justAddedSeason: false,
  crudMode: null
};

export default function (state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case ADD_SEASON_SUCCESS:
      return {
        ...state,
        season: payload,
        loading: false,
        justAddedSeason: true
      };
    case UPDATE_SEASON_SUCCESS:
    case GET_SEASON_SUCCESS:
      return {
        ...state,
        season: payload,
        loading: false,
        justAddedSeason: false
      };
    case GET_SEASONS_SUCCESS:
      return {
        ...state,
        seasons: payload,
        loading: false,
        justAddedSeason: false
      };
    case ADD_SEASON_FAILURE:
    case GET_SEASON_FAILURE:
    case GET_SEASONS_FAILURE:
    case UPDATE_SEASON_FAILURE:
      return {
        ...state,
        error: payload,
        loading: false,
        justAddedSeason: false
      };
    default:
      return state;
  }
};
