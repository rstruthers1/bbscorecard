import uuid from 'uuid';
import {SET_ALERT, REMOVE_ALERT} from "./types";


export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuid.v4();
  dispatch( {
    type: SET_ALERT,
    payload: {
      msg,
      alertType,
      id
    }
  });

  setTimeout(() => dispatch({type: REMOVE_ALERT, payload: id}), timeout);
};

export const showErrorAlerts = (err, dispatch) => {
  let errors = null;
  if (err && err.response && err.response.data) {
    errors = err.response.data.errors;
  }

  if (errors == null) {
    errors = [{msg: err.message}];
  }

  if (errors && dispatch) {
    errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
  }
};

