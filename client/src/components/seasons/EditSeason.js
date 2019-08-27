import React, {Fragment, useState, useEffect} from 'react';
import {Link, Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import {updateSeason, getSeason} from '../../actions/seasonAction';
import {getFormattedDateFromUtcString, INPUT_DATE_FORMAT} from '../../utils/dateUtils';

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

const EditSeason = ({updateSeason, getSeason, season, loading, match, justAddedSeason}) => {

  const classes = useStyles();

  const seasonName = season ? (season.name ? season.name: "") : "";
  const seasonStartDate = season ? (season.startDate ? season.startDate: "") : "";
  const seasonEndDate = season ? (season.endDate ? season.endDate: "") : "";

  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    getSeason(match.params.id);
    setName(seasonName);
    setStartDate(seasonStartDate);
    setEndDate(seasonEndDate);
  }, [getSeason, loading, match.params.id, seasonName, seasonStartDate, seasonEndDate]);

  const onChangeNameHandler = e => {
    setName(e.target.value);
  };

  const onChangeStartDateHandler = e => {
    setStartDate(e.target.value);
  };

  const onChangeEndDateHandler = e => {
    setEndDate(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    updateSeason(match.params.id, {name: name, startDate: startDate, endDate: endDate});
  };

  return justAddedSeason ? <Redirect to={`/seasons/${season._id}/view`} /> : (
      <Fragment>
        <h1 className='large text-primary'>Edit Season</h1>
        <form className='form' onSubmit={e => onSubmit(e)}>
          <div className='form-group' >
            <TextField
                id="name"
                type="text"
                label="Name"
                placeholder="Name"
                value={name}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange = {e => onChangeNameHandler(e)}
            />
          </div>
          <div className='form-group'>
            <TextField
                id="startDate"
                type="date"
                label="Start Date"
                placeholder="Start Date"
                value={getFormattedDateFromUtcString(startDate, INPUT_DATE_FORMAT)}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange = {e => onChangeStartDateHandler(e)}
            />

          </div>
          <div className='form-group'>
            <TextField
                id="endDate"
                type="date"
                label="End Date"
                placeholder="End Date"
                value={getFormattedDateFromUtcString(endDate, INPUT_DATE_FORMAT)}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange = {e => onChangeEndDateHandler(e)}
            />

          </div>
          <input type='submit' className='btn btn-primary my-1'/>
          <Link className='btn btn-light my-1' to='/seasons/list'>
            Go Back
          </Link>
        </form>
      </Fragment>
  );
};

EditSeason.propTypes = {
  updateSeason: PropTypes.func.isRequired,
  getSeason: PropTypes.func.isRequired,
  season: PropTypes.object,
  justAddedSeason: PropTypes.bool,
  loading: PropTypes.bool
};

const mapStateToProps = state => {
  console.log("state: " + JSON.stringify(state));
  return {
    season: state.seasonReducer.season,
    justAddedSeason: state.seasonReducer.justAddedSeason,
    loading: state.seasonReducer.loading
  }
};

export default connect(mapStateToProps, {updateSeason, getSeason})(EditSeason);
