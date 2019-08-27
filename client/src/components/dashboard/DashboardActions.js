import React from 'react';
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';

const DashboardActions = ({user}) => {
  return !user ?  (<Spinner/>) : (
      <div className='dash-buttons'>
        <Link to='/seasons/list' className='btn btn-light'>
          Your Seasons
        </Link>
        <Link to='/teams/list' className='btn btn-light'>
          Teams
        </Link>
        <Link to='/teams/add' className='btn btn-light'>
          Add Team
        </Link>
        <Link to='/players/list' className='btn btn-light'>
          Players
        </Link>
      </div>
  );
};

export default DashboardActions;
