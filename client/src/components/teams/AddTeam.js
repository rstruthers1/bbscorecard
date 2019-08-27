import React, {Fragment, useEffect, useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {addTeam, getTeam, updateTeam} from '../../actions/teamAction';

import {
  getFormattedDateFromUtcString,
  INPUT_DATE_FORMAT
} from '../../utils/dateUtils';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
}));

const AddTeam = ({addTeam, getTeam, updateTeam, team, crudMode, loading, match, justAddedTeam}) => {
  const classes = useStyles();

  const teamName = team ? (team.name ? team.name : "") : "";
  const teamCity = team ? (team.city ? team.city : "") : "";
  const teamState = team ? (team.state ? team.state : "") : "";
  const teamStadium = team ? (team.stadium ? team.stadium : "") : "";

  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [stadium, setStadium] = useState('');

  let id = null;
  if (match && match.params) {
    id = match.params.id;
  }

  if (!crudMode) {
    if (id) {
      crudMode = 'UPDATE'
    } else {
      crudMode = 'CREATE'
    }
  }

  console.log("***crudMode: " + crudMode);

  useEffect(() => {
    if (crudMode === 'UPDATE') {
      getTeam(id);
      setName(teamName);
      setCity(teamCity);
      setState(teamState);
      setStadium(teamStadium);
    }
  }, [getTeam, crudMode, loading, id, teamName,
    teamCity, teamState, teamStadium]);

  const objectName = 'Team';

  let title = `Add ${objectName}`;
  if (crudMode === 'UPDATE') {
    title = `Edit ${objectName}`;
  }

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
    if (crudMode === 'CREATE') {
      addTeam({name, city, state, stadium});
    } else if (crudMode === 'UPDATE') {
      updateTeam(id, {name, city, state, stadium})
    }
  };

  return (
      <Fragment>
        <h1 className='large text-primary'>{title}</h1>
        <form className='form' onSubmit={e => onSubmit(e)}>
          <div className='form-group'>
            <TextField
                id="name"
                type="text"
                label="Team Name"
                placeholder="Team Name"
                value={name}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={e => onChangeNameHandler(e)}
            />
          </div>
          <div className='form-group'>
            <TextField
                id="city"
                type="text"
                label="City"
                placeholder="City"
                value={city}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={e => onChangeCityHandler(e)}
            />
          </div>
          <div className='form-group'>
            <TextField
                id="state"
                type="text"
                label="State"
                placeholder="State"
                value={state}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={e => onChangeStateHandler(e)}
            />
          </div>
          <div className='form-group'>
            <TextField
                id="stadium"
                type="text"
                label="Stadium"
                placeholder="Stadium"
                value={stadium}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={e => onChangeStadiumHandler(e)}
            />
          </div>
          <input type='submit' className='btn btn-primary my-1'/>
          <Link className='btn btn-light my-1' to='/teams/list'>
            Go Back
          </Link>
        </form>
      </Fragment>
  );
};

AddTeam.propTypes = {
  addTeam: PropTypes.func.isRequired,
  getTeam: PropTypes.func,
  updateTeam: PropTypes.func,
  team: PropTypes.object,
  loading: PropTypes.bool,
  justAddedTeam: PropTypes.bool
};

const mapStateToProps = state => {
  console.log("state: " + JSON.stringify(state));
  return {
    team: state.teamReducer.team,
    loading: state.teamReducer.loading,
    justAddedTeam: state.teamReducer.justAddedTeam
  }
};

export default connect(mapStateToProps, {addTeam, getTeam, updateTeam})(AddTeam);
