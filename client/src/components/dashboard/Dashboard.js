import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';

const Dashboard = ({auth: {user}}) => {
  return user ? (
      <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
          <FontAwesomeIcon icon={faUser} /> Welcome {user && user.firstName}
        </p>
        <DashboardActions user={user}/>
      </Fragment>

  ) : (<Spinner/>);
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Dashboard);
