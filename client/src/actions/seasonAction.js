import axios from 'axios';
import {setAlert, showErrorAlerts} from './alert';

import {
  ADD_SEASON_SUCCESS,
  ADD_SEASON_FAILURE,
  GET_SEASON_SUCCESS,
  GET_SEASON_FAILURE,
  GET_SEASONS_SUCCESS,
  GET_SEASONS_FAILURE,
  UPDATE_SEASON_SUCCESS,
  UPDATE_SEASON_FAILURE,
  GET_LEAGUES_FOR_SEASON_SUCCESS,
  GET_LEAGUES_FOR_SEASON_FAILURE,
  CREATE
} from './types';

// Add season
export const addSeason = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  console.log("formData: " + JSON.stringify(formData));

  try {
    const res = await axios.post('/api/seasons', formData, config);
    dispatch({
      type: ADD_SEASON_SUCCESS,
      payload: res.data,
      crudMode: CREATE
    });
    dispatch(setAlert('Season added', 'success'));
  } catch (err) {
    console.log(err);
    showErrorAlerts(err, dispatch);
    dispatch({
      type: ADD_SEASON_FAILURE,
      payload: {msg: err.response.statusText, status: err.response.status}
    });
  }
};

// Update season
export const updateSeason = (id, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  console.log("formData: " + JSON.stringify(formData));

  try {
    const res = await axios.put(`/api/seasons/${id}`, formData, config);
    dispatch({
      type: UPDATE_SEASON_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert('Season updated', 'success'));
  } catch (err) {
    console.log(err);
    showErrorAlerts(err, dispatch);
    dispatch({
      type: UPDATE_SEASON_FAILURE,
      payload: {err}
    });
  }
};

// Get season
export const getSeason = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/seasons/${id}`);
    dispatch({
      type: GET_SEASON_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    showErrorAlerts(err, dispatch);
    dispatch({
      type: GET_SEASON_FAILURE,
      payload: {msg: err.response.statusText, status: err.response.status}
    });
  }
};

// Get seasons
export const getSeasons = () => async dispatch => {
  try {
    const res = await axios.get('/api/seasons');
    dispatch({
      type: GET_SEASONS_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    showErrorAlerts(err, dispatch);
    dispatch({
      type: GET_SEASONS_FAILURE,
      payload: {msg: err.response.statusText, status: err.response.status}
    });
  }
};

// Get leagues for season
export const getLeaguesForSeason = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/seasons/${id}/leagues`);
    dispatch({
      type: GET_LEAGUES_FOR_SEASON_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    showErrorAlerts(err, dispatch);
    dispatch({
      type: GET_LEAGUES_FOR_SEASON_FAILURE,
      payload: {msg: err.response.statusText, status: err.response.status}
    });
  }
};
