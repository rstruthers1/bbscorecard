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

import {getPlayers} from '../../actions/playerAction';
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


const ListPlayers = ({getPlayers, players, loading}) => {

  useEffect(() => {
    getPlayers();
  }, [getPlayers, loading]);

  const classes = useStyles();

  let rows = [];

  if (!loading && players) {
    rows = players.map(player => {
      return {
        firstName: player.firstName,
        lastName: player.lastName,
        birthDate: getFormattedDateFromUtcString(player.dateOfBirth),
        id: player._id
      }
    });
  }

  return (!loading) ? (
      <Fragment>
        <h1 className='large text-primary'>Players</h1>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <StyledTableCell>First Name</StyledTableCell>
                <StyledTableCell>Last Name</StyledTableCell>
                <StyledTableCell>Birth Date</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                  <TableRow key={row.id} hover>
                    <TableCell align="left">{row.firstName}</TableCell>
                    <TableCell align="left">{row.lastName}</TableCell>
                    <TableCell align="left">{row.birthDate}</TableCell>
                    <TableCell align="left"><Link
                        to={`/players/${row.id}/edit`}><FontAwesomeIcon
                        icon={faEdit}/></Link></TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <br/>
        <Link to='/players/add' className='btn btn-light'>
          Add Player
        </Link>
      </Fragment>) : (<Spinner/>)

};

ListPlayers.propTypes = {
  getPlayers: PropTypes.func.isRequired,
  players: PropTypes.array,
  loading: PropTypes.bool
};

const mapStateToProps = state => {
  console.log("state: " + JSON.stringify(state));
  return {
    players: state.playerReducer.players,
    loading: state.playerReducer.loading
  }
};

export default connect(mapStateToProps, {getPlayers})(ListPlayers);
