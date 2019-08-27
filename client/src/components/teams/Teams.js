import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import {getTeams} from '../../actions/teamAction';
import Spinner from '../layout/Spinner';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  card: {
    minWidth: 200,
    minHeight: 150
  },
  cardActionArea: {
    minWidth: 200,
    minHeight: 150,
    verticalAlign: "text-top"
  },
  cardContent: {
    minWidth: 200,
    minHeight: 150,
    verticalAlign: "text-top"
  },
  media: {
    height: 0,
    paddingTop: '30%', // 16:9
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  }

}));

const Teams = ({getTeams, teams, loading}) => {
  useEffect(() => {
    getTeams()
  }, [getTeams, loading]);

  const classes = useStyles();

  return (
      <Fragment>
        <h1 className='large text-primary'>Teams</h1>
        {
          loading || !teams ? <Spinner/> :
              <Fragment>
                <Grid container className={classes.root} spacing={2}>
                  <Grid item m={4}>
                    <Grid container justify="center" spacing={2}>
                      {teams.map(team => (
                          <Grid key={team._id} item>
                            <Card className={classes.card}>
                              <CardContent className={classes.cardContent}>
                                <h1 style={{marginTop: "0"}}>{team.name}</h1>
                                <p>{team.city}, {team.state}</p>
                                <p>{team.stadium}</p>
                              </CardContent>
                              <CardActions>
                                <Link to={`/teams/${team._id}/edit`}>
                                  <Button size="small" color="primary">
                                    Edit
                                  </Button>
                                </Link>
                                <Link to={`/teams/${team._id}/players`}>
                                  <Button size="small" color="primary">
                                    Add Players
                                  </Button>
                                </Link>
                              </CardActions>
                            </Card>
                          </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Fragment>
        }
      </Fragment>
  );
};

Teams.propTypes = {
  getTeams: PropTypes.func.isRequired,
  teams: PropTypes.array,
  loading: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    teams: state.teamReducer.teams,
    loading: state.teamReducer.loading
  }
};

export default connect(mapStateToProps, {getTeams})(Teams);
