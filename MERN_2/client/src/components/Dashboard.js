import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  getCurrentProfile,
  deleteExperience,
  deleteEducation,
  deleteAccount,
} from '../actions/profile';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import { Link, Redirect, withRouter } from 'react-router-dom';
import Alert from './Alert';
import DashboardActions from './DashboardActions';
import Moment from 'react-moment';

const Dashboard = ({
  getCurrentProfile,
  deleteExperience,
  deleteEducation,
  deleteAccount,
  profile: { profile, loading },
  auth: { user, isAuthenticated },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  if (!isAuthenticated) {
    return <Redirect to='/login' />;
  }

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <div className='container'>
      <section className='dashboard mt-3'>
        <Alert />
        <h1 className='large text-dark'>Dashboard</h1>
        <p className='text-dark'>
          <i className='fas fa-user mr-2'></i>
          Welcome {user && user.name}
        </p>
        {profile !== null ? (
          <div>
            {' '}
            <DashboardActions />
            {profile && profile.experience ? (
              profile.experience.map((exp) => {
                return (
                  <div>
                    <h2 className='my-2 mt-5'>Experience Credentials</h2>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th>Company</th>
                          <th className='hide-sm'>Title</th>
                          <th className='hide-sm'>Years</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr key={exp._id}>
                          <td>{exp.company}</td>
                          <td className='hide-sm'>{exp.title}</td>

                          <td>
                            <Moment format='DD/MM/YYYY'>{exp.from}</Moment> -
                            {exp.to === null ? (
                              ' Now'
                            ) : (
                              <Moment format='DD/MM/YYYY'>{exp.to}</Moment>
                            )}
                          </td>
                          <td>
                            <button
                              className='btn btn-danger'
                              onClick={() => deleteExperience(exp._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                );
              })
            ) : (
              <h1>Please add an education</h1>
            )}
            {profile && profile.education ? (
              profile.education.map((edu) => {
                return (
                  <div>
                    <h2 className='my-2 mt-5'>Education Credentials</h2>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th>Instituition</th>
                          <th className='hide-sm'>Title</th>
                          <th className='hide-sm'>Years</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr key={edu._id}>
                          <td>{edu.school}</td>
                          <td className='hide-sm'>{edu.fieldofstudy}</td>

                          <td>
                            <Moment format='DD/MM/YYYY'>{edu.from}</Moment> -
                            {edu.to === null ? (
                              ' Now'
                            ) : (
                              <Moment format='DD/MM/YYYY'>{edu.to}</Moment>
                            )}
                          </td>
                          <td>
                            <button
                              className='btn btn-danger'
                              onClick={() => deleteEducation(edu._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                );
              })
            ) : (
              <h1>Please add an education</h1>
            )}
            <div className='my-2'>
              <button
                className='btn btn-danger mt-5'
                onClick={() => {
                  deleteAccount();
                }}
              >
                <i className='fas fa-user minus mr-2'></i>
                Delete account
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p>You have not yet created a profile, please create one</p>
            <Link to='/create-profile' className='btn btn-primary my-1'>
              Create Profile
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteExperience,
  deleteEducation,
  deleteAccount,
})(withRouter(Dashboard));
