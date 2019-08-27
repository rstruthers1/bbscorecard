import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import teamReducer from './teamReducer';
import playerReducer from './playerReducer';
import seasonReducer from './seasonReducer';

export default combineReducers({
  alert,
  auth,
  teamReducer,
  playerReducer,
  seasonReducer
});
