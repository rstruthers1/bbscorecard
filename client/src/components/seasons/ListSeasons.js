import React, {Fragment, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons';

import {getSeasons} from '../../actions/seasonAction';
import Spinner from '../layout/Spinner';
import {getFormattedDateFromUtcString} from '../../utils/dateUtils';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    maxWidth: 600
  },
  table: {
    minWidth: 300,
    maxWidth: 600
  },
  labelCell: {
    fontWeight: 'bold'
  }

}));

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const ListSeasons = ({getSeasons, match, seasons, loading}) => {

  useEffect(() => {
    getSeasons();
  }, [getSeasons, loading, match.params.id]);

  const classes = useStyles();

  let rows = [];

  if (!loading && seasons) {
    rows = seasons.map(season => {
      return {
        name: season.name,
        startDate: getFormattedDateFromUtcString(season.startDate),
        endDate: getFormattedDateFromUtcString(season.endDate),
        id: season._id
      }
    });
  }

  return (!loading) ? (
      <Fragment>
        <h1 className='large text-primary'>Your Seasons</h1>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Start Date</StyledTableCell>
                <StyledTableCell>End Date</StyledTableCell>
                <StyledTableCell>Edit Season</StyledTableCell>
                <StyledTableCell>Leagues</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                  <TableRow key={row.id} hover>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.startDate}</TableCell>
                    <TableCell align="left">{row.endDate}</TableCell>
                    <TableCell align="left">
                      <Link
                        to={`/seasons/${row.id}/edit`}><FontAwesomeIcon
                        icon={faEdit}/></Link></TableCell>
                    <TableCell align="left">
                    <Link
                        to={`/seasons/${row.id}/league`}>Show Leagues</Link></TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <br/>
        <Link to='/seasons/add' className='btn btn-light'>
          Add Season
        </Link>
      </Fragment>) : (<Spinner/>)
};

ListSeasons.propTypes = {
  getSeasons: PropTypes.func.isRequired,
  seasons: PropTypes.array,
  loading: PropTypes.bool
};

const mapStateToProps = state => {
  console.log("state: " + JSON.stringify(state));
  return {
    seasons: state.seasonReducer.seasons,
    loading: state.seasonReducer.loading
  }
};

export default connect(mapStateToProps, {getSeasons})(ListSeasons);
