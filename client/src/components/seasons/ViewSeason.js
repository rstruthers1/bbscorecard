import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {getSeason} from '../../actions/seasonAction';
import Spinner from '../layout/Spinner';
import {getFormattedDateFromUtcString} from '../../utils/dateUtils';


const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    maxWidth: 300
  },
  table: {
    minWidth: 300,
    maxWidth: 300
  },
  labelCell: {
    fontWeight: 'bold'
  }

}));

const ViewSeason = ({getSeason, match, season, loading}) => {

  const seasonName = season ? (season.name ? season.name: "") : "";
  let seasonStartDate = season ? (season.startDate ? season.startDate: "") : "";
  let seasonEndDate = season ? (season.endDate ? season.endDate: "") : "";

  seasonStartDate = getFormattedDateFromUtcString(seasonStartDate);
  seasonEndDate = getFormattedDateFromUtcString(seasonEndDate);

  useEffect(() => {
    getSeason(match.params.id);
    // setName(seasonName);
    // setStartDate(seasonStartDate);
    // setEndDate(seasonEndDate);
  }, [getSeason, loading, match.params.id]);



  const classes = useStyles();

  function createData(label, value) {
    return { label, value };
  }

  let rows = [];

  if (!loading) {
    rows = [
      createData('Name', seasonName),
      createData('Start Date', seasonStartDate),
      createData('End Date', seasonEndDate)
    ]
  }

  console.log("seasonName: " + seasonName);

  return (!loading) ? (
      <Fragment>
        <h1 className='large text-primary'>View Season</h1>

        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>

            </TableHead>
            <TableBody>
              {rows.map(row => (
                  <TableRow key={row.label}>
                    <TableCell align="left" className={classes.labelCell}>{row.label}</TableCell>
                    <TableCell align="left">{row.value}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Fragment>) : (<Spinner/>)

};

ViewSeason.propTypes = {
  getSeason: PropTypes.func.isRequired,
  season: PropTypes.object,
  loading: PropTypes.bool
};

const mapStateToProps = state => {
  console.log("state: " + JSON.stringify(state));
  return {
    season: state.seasonReducer.season,
    loading: state.seasonReducer.loading
  }
};

export default connect(mapStateToProps, {getSeason})(ViewSeason);
