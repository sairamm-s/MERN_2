import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { logout } from '../actions/auth';
import { useState } from 'react';

const Navbar = ({ logout, auth }) => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const authLinks = (
    <ul className='navbar-nav ml-auto'>
      <li className='nav-item '>
        <Link className='nav-link' to='/profiles'>
          Developers
        </Link>
      </li>
      <li>
        <Link className='nav-link' to='/posts'>
          <span className='hide-sm'>Posts</span>
        </Link>
      </li>
      <li className='nav-item '>
        <Link className='nav-link' to='/dashboard'>
          <i className='fas fa-user mr-2'></i>
          <span className=''>Dashboard</span>
        </Link>
      </li>
      <li>
        <Link className='nav-link' onClick={logout} to='/login'>
          <i className='fas fa-sign-out-alt mr-2'></i>
          <span className='hide-sm'>Logout</span>
        </Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul className='navbar-nav ml-auto'>
      <li className='nav-item '>
        <Link className='nav-link' to='/profiles'>
          Developers
        </Link>
      </li>
      <li>
        <Link className='nav-link' to='/register'>
          Register
        </Link>
      </li>
      <li>
        <Link className='nav-link' to='/login'>
          Login
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <Link className='navbar-brand' to='/'>
        Developer Connector
      </Link>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarSupportedContent'
        aria-controls='navbarSupportedContent'
        aria-expanded={!isNavCollapsed ? true : false}
        aria-label='Toggle navigation'
        onClick={handleNavCollapse}
      >
        <span className='navbar-toggler-icon'></span>
      </button>

      <div
        className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}
        id='navbarSupportedContent'
      >
        {!auth.loading && (
          <Fragment> {auth.isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
