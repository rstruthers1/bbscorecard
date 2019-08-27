import {
  CREATE_TEAM_SUCCESS,
  CREATE_TEAM_FAIL,
  GET_TEAMS_SUCCESS,
  GET_TEAMS_FAIL,
  GET_TEAM_SUCCESS,
  GET_TEAM_FAIL,
  EDIT_TEAM_SUCCESS,
  EDIT_TEAM_FAIL
} from '../actions/types';

const initialState = {
  team: null,
  teams: null,
  loading: true
};

export default function(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case CREATE_TEAM_SUCCESS:
    case EDIT_TEAM_SUCCESS:
      return {
        ...state,
        team: payload
      };
    case GET_TEAMS_SUCCESS:
      return {
        ...state,
        teams: payload,
        loading: false,
      };
    case GET_TEAM_SUCCESS:
      return {
        ...state,
        team: payload,
        loading: false,
      };
    case GET_TEAMS_FAIL:
    case CREATE_TEAM_FAIL:
    case GET_TEAM_FAIL:
    case EDIT_TEAM_FAIL:
      return {
        ...state,
        error: payload
      };
    default:
      return state;
  }
};

