import React, {Fragment, useEffect, useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {addPlayer, getPlayer, updatePlayer} from '../../actions/playerAction';
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

const AddPlayer = ({addPlayer, getPlayer, updatePlayer, player, crudMode, loading, match, justAddedPlayer}) => {

  const classes = useStyles();

  const playerFirstName = player ? (player.firstName ? player.firstName : "")
      : "";
  const playerLastName = player ? (player.lastName ? player.lastName : "") : "";
  const playerBirthDate = player ? (player.dateOfBirth ? player.dateOfBirth
      : "") : "";

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

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
      console.log("*** in useEffect, calling getPlayer, id is: " + id);
      getPlayer(id);
      setFirstName(playerFirstName);
      setLastName(playerLastName);
      setDateOfBirth(playerBirthDate);
    }
  }, [getPlayer, crudMode, loading, id, playerFirstName,
    playerLastName, playerBirthDate]);

  const objectName = 'Player';

  let title = `Add ${objectName}`;
  if (crudMode === 'UPDATE') {
    title = `Edit ${objectName}`;
  }

  const onChangeFirstNameHandler = e => {
    setFirstName(e.target.value);
  };

  const onChangeLastNameHandler = e => {
    setLastName(e.target.value);
  };

  const onChangeDateOfBirthHandler = e => {
    setDateOfBirth(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (crudMode === 'CREATE') {
      addPlayer({firstName, lastName, dateOfBirth});
    } else if (crudMode === 'UPDATE') {
      updatePlayer(id, {firstName, lastName, dateOfBirth})
    }
  };

  return justAddedPlayer ? <Redirect to={'/players/list'}/> : (

      <Fragment>
        <h1 className='large text-primary'>{title}</h1>
        <form className='form' onSubmit={e => onSubmit(e)}>
          <div className='form-group'>
            <TextField
                id="firstName"
                type="text"
                label="First Name"
                placeholder="First Name"
                value={firstName}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={e => onChangeFirstNameHandler(e)}
            />
          </div>
          <div className='form-group'>
            <TextField
                id="lastName"
                type="text"
                label="Last Name"
                placeholder="Last Name"
                value={lastName}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={e => onChangeLastNameHandler(e)}
            />

          </div>
          <div className='form-group'>
            <TextField
                id="dateOfBirth"
                type="date"
                label="Date of Birth"
                placeholder="Date of Birth"
                value={getFormattedDateFromUtcString(dateOfBirth,
                    INPUT_DATE_FORMAT)}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={e => onChangeDateOfBirthHandler(e)}
            />
          </div>
          <input type='submit' className='btn btn-primary my-1'/>
          <Link className='btn btn-light my-1' to='/players/list'>
            Go Back
          </Link>
        </form>
      </Fragment>
  );
};

AddPlayer.propTypes = {
  addPlayer: PropTypes.func.isRequired,
  getPlayer: PropTypes.func.isRequired,
  updatePlayer: PropTypes.func.isRequired,
  player: PropTypes.object,
  loading: PropTypes.bool,
  justAddedPlayer: PropTypes.bool
};

const mapStateToProps = state => {
  console.log("state: " + JSON.stringify(state));
  return {
    player: state.playerReducer.player,
    loading: state.playerReducer.loading,
    justAddedPlayer: state.playerReducer.justAddedPlayer
  }
};

export default connect(mapStateToProps, {addPlayer, getPlayer, updatePlayer})(
    AddPlayer);
