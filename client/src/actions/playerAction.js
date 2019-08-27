import axios from 'axios';
import {setAlert, showErrorAlerts} from './alert';

import {
  ADD_PLAYER_SUCCESS,
  ADD_PLAYER_FAIL,
  GET_PLAYERS_SUCCESS,
  GET_PLAYERS_FAILURE,
  UPDATE_PLAYER_SUCCESS,
  UPDATE_PLAYER_FAIL,
  GET_PLAYER_SUCCESS,
  GET_PLAYER_FAIL,
  CREATE
} from './types';

// Add player
export const addPlayer = (formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/players', formData, config);
    dispatch({
      type: ADD_PLAYER_SUCCESS,
      payload: res.data,
      crudMode: CREATE
    });
    dispatch(setAlert('Player added', 'success'));
  } catch (err) {
    console.log(err);
    showErrorAlerts(err, dispatch);
    dispatch({
      type: ADD_PLAYER_FAIL,
      payload: {msg: err.response.statusText, status: err.response.status}
    });
  }
};

// Update player
export const updatePlayer = (id, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  console.log("formData: " + JSON.stringify(formData));

  try {
    const res = await axios.put(`/api/players/${id}`, formData, config);
    dispatch({
      type: UPDATE_PLAYER_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert('Player updated', 'success'));
  } catch (err) {
    console.log(err);
    showErrorAlerts(err, dispatch);
    dispatch({
      type: UPDATE_PLAYER_FAIL,
      payload: {err}
    });
  }
};

// Get player
export const getPlayer = (id) => async dispatch => {
  try {
    console.log(`*** Calling backend: /api/players/${id}`);
    const res = await axios.get(`/api/players/${id}`);
    dispatch({
      type: GET_PLAYER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    showErrorAlerts(err, dispatch);
    dispatch({
      type: GET_PLAYER_FAIL,
      payload: {msg: err.response.statusText, status: err.response.status}
    });
  }
};

// Get players
export const getPlayers = () => async dispatch => {
  try {
    const res = await axios.get('/api/players');
    dispatch({
      type: GET_PLAYERS_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    showErrorAlerts(err, dispatch);
    dispatch({
      type: GET_PLAYERS_FAILURE,
      payload: {msg: err.response.statusText, status: err.response.status}
    });
  }
};
