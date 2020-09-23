import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const Landing = ({ auth }) => {
  if (auth.isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='landing'>
      <div className='dark-overlay'>
        <div className='container-fluid'>
          <div className='row text-center'>
            <div className='col-12'>
              <h3 className='display-4 text-white'>Developer Connector</h3>
            </div>
          </div>
          <div className='d-flex flex-row justify-content-center bd-highlight'>
            <div className='p-2 bd-highlight'>
              {' '}
              <button type='button' className='btn'>
                <Link to='/register' className='btn btn-primary'>
                  Register
                </Link>
              </button>
            </div>
            <div className='p-2 bd-highlight'>
              {' '}
              <button type='button' className='btn'>
                <Link to='/login' className='btn btn-success'>
                  Login
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Landing.propTypes = {
  auth: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
