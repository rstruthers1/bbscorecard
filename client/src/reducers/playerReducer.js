import {
  ADD_PLAYER_SUCCESS,
  ADD_PLAYER_FAIL,
  GET_PLAYERS_SUCCESS,
  GET_PLAYERS_FAILURE,
  UPDATE_PLAYER_SUCCESS,
  UPDATE_PLAYER_FAIL,
  GET_PLAYER_SUCCESS,
  GET_PLAYER_FAIL
} from '../actions/types';

const initialState = {
  player: null,
  players: [],
  loading: true,
  crudMode: null,
  justAddedPlayer: false
};

export default function (state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case ADD_PLAYER_SUCCESS:
      return {
        ...state,
        player: payload,
        loading: false,
        justAddedPlayer: true
      };
    case UPDATE_PLAYER_SUCCESS:
    case GET_PLAYER_SUCCESS:
      return {
        ...state,
        player: payload,
        loading: false,
        justAddedPlayer: false
      };
    case GET_PLAYERS_SUCCESS:
      return {
        ...state,
        players: payload,
        loading: false,
        justAddedPlayer: false
      };
    case ADD_PLAYER_FAIL:
    case GET_PLAYERS_FAILURE:
    case UPDATE_PLAYER_FAIL:
    case GET_PLAYER_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
        justAddedPlayer: false
      };
    default:
      return state;
  }
};
