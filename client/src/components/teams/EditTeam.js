import React, {useState, useEffect, Fragment} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getTeam, addTeam} from '../../actions/teamAction';
import Spinner from '../layout/Spinner';

const EditTeam = ({getTeam, addTeam, match, team, loading}) => {
  const teamName = team ? (team.name ? team.name: "") : "";
  const teamCity = team ? (team.city ? team.city: "") : "";
  const teamState = team ? (team.state ? team.state: "") : "";
  const teamStadium = team ? (team.stadium ? team.stadium: "") : "";

  useEffect(() => {
    getTeam(match.params.id);
    setName(teamName);
    setCity(teamCity);
    setState(teamState);
    setStadium(teamStadium);
  }, [getTeam, loading, teamName, teamCity, teamState, teamStadium, match.params.id]);

  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [stadium, setStadium] = useState('');

  const onChangeNameHandler = e => {
    setName(e.target.value);
  };

  const onChangeCityHandler = e => {
    setCity(e.target.value);
  };

  const onChangeStateHandler = e => {
    setState(e.target.value);
  };

  const onChangeStadiumHandler = e => {
    setStadium(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    addTeam({name, city, state, stadium}, match.params.id);
  };

  return loading ? <Spinner/> : (
      <Fragment>
        <h1 className='large text-primary'>Edit Team</h1>
        <form className='form' onSubmit={e => onSubmit(e)}>
          <div className='form-group'>
            <input
                type='text'
                placeholder='Team Name'
                name='name'
                value={name}
                onChange = {e => onChangeNameHandler(e)}
                required
            />
            <small className='form-text'>
              Team Name
            </small>
          </div>
          <div className='form-group'>
            <input
                type='text'
                placeholder='City'
                name='city'
                value={city}
                onChange = {e => onChangeCityHandler(e)}
                required
            />
            <small className='form-text'>
              City
            </small>

          </div>
          <div className='form-group'>
            <input
                type='text'
                placeholder='State'
                name='state'
                value={state}
                onChange = {e => onChangeStateHandler(e)}
                required
            />
            <small className='form-text'>
              State
            </small>
          </div>
          <div className='form-group'>
            <input
                type='text'
                placeholder='Stadium'
                name='stadium'
                value={stadium}
                onChange = {e => onChangeStadiumHandler(e)}
                required
            />
            <small className='form-text'>
              Stadium
            </small>
          </div>
          <input type='submit' className='btn btn-primary my-1'/>
          <Link className='btn btn-light my-1' to='/teams'>
            Go Back
          </Link>
        </form>
      </Fragment>
  );
};

EditTeam.propTypes = {
  getTeam: PropTypes.func.isRequired,
  addTeam: PropTypes.func.isRequired,
  team: PropTypes.object,
  loading: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    team: state.teamReducer.team,
    loading: state.teamReducer.loading
  }
};

export default connect(mapStateToProps, {getTeam, addTeam})(EditTeam);
