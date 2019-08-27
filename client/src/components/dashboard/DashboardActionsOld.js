import React from 'react';
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';

const DashboardActions = ({user}) => {
  return !user ?  (<Spinner/>) : (
      <div className='dash-buttons'>
        <Link to='/seasons/add' className='btn btn-light'>
          Add Season
        </Link>
        <Link to='/create-game' className='btn btn-light'>
          Create Game
        </Link>
        <Link to='/create-team' className='btn btn-light'>
          Create Team
        </Link>
        <Link to='/teams' className='btn btn-light'>
          Teams
        </Link>
        <Link to='/add-player' className='btn btn-light'>
          Add Player
        </Link>
      </div>
  );
};

export default DashboardActions;
