import React, {Fragment} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {logout} from '../../actions/auth'

const AppNavbar = ({auth: {isAuthenticated, loading}, logout}) => {
  const authLinks = (
      <ul>
        <li>
          <a onClick={logout} href='#!'>
            <FontAwesomeIcon icon={faSignOutAlt}/>{' '}
            <span className="hide-sm">Logout</span>
          </a>
        </li>
      </ul>
  );

  const guestLinks = (
      <ul>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
  );

  return (
      <nav className="navbar bg-dark">

        <h1>
          <Link to="/">
            <img src="images/icons8-baseball-ball-64.png" alt=""
                 style={{
                   width: "48px",
                   height: "48px",
                   marginBottom: "-15px",
                   marginRight: "10px"
                 }}/>
            BB Scorecard
          </Link>
        </h1>
        {!loading &&
        <Fragment>
          {isAuthenticated ? authLinks : guestLinks}
        </Fragment>
        }


      </nav>
  );
};

AppNavbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
};

export default connect(mapStateToProps, {logout})(AppNavbar);
