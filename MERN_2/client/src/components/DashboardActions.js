import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className='dash-buttons'>
      <Link className='btn btn-light mr-3' to='/edit'>
        <i className='fas mr-2 fa-user-circle text-primary'></i>
        Edit profile
      </Link>
      <Link className='btn btn-light mr-3' to='/add-experience'>
        <i className='fas mr-2 fa-graduation-cap text-primary'></i>
        Add experience
      </Link>
      <Link className='btn btn-light mr-3' to='/add-education'>
        <i className='fab mr-2 fa-black-tie text-primary'></i>
        Add education
      </Link>
    </div>
  );
};

export default DashboardActions;
