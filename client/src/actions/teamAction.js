import axios from 'axios';
import {setAlert, showErrorAlerts} from './alert';

import {
  CREATE_TEAM_SUCCESS,
  CREATE_TEAM_FAIL,
  GET_TEAMS_SUCCESS,
  GET_TEAMS_FAIL,
  GET_TEAM_SUCCESS,
  GET_TEAM_FAIL,
  EDIT_TEAM_SUCCESS,
  EDIT_TEAM_FAIL,
  CREATE
} from './types';

// Add team
export const addTeam = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/teams', formData, config);
    dispatch({
      type: CREATE_TEAM_SUCCESS,
      payload: res.data,
      crudMode: CREATE
    });
    dispatch(setAlert('Team added', 'success'));
  } catch (err) {
    console.log(err);
    showErrorAlerts(err, dispatch);
    dispatch({
      type: CREATE_TEAM_FAIL,
      payload: {msg: err.response.statusText, status: err.response.status}
    });
  }
};

// Update team
export const updateTeam = (id, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  console.log("formData: " + JSON.stringify(formData));

  try {
    const res = await axios.put(`/api/teams/${id}`, formData, config);
    dispatch({
      type: EDIT_TEAM_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert('Team updated', 'success'));
  } catch (err) {
    console.log(err);
    showErrorAlerts(err, dispatch);
    dispatch({
      type: EDIT_TEAM_FAIL,
      payload: {msg: err.response.statusText, status: err.response.status}
    });
  }
};

// Get team
export const getTeam = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/teams/${id}`);
    dispatch({
      type: GET_TEAM_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    showErrorAlerts(err, dispatch);
    dispatch({
      type: GET_TEAM_FAIL,
      payload: {msg: err.response.statusText, status: err.response.status}
    });
  }
};

// Get teams
export const getTeams = () => async dispatch => {
  try {
    const res = await axios.get('/api/teams');
    dispatch({
      type: GET_TEAMS_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    showErrorAlerts(err, dispatch);
    dispatch({
      type: GET_TEAMS_FAIL,
      payload: {msg: err.response.statusText, status: err.response.status}
    });
  }
};


