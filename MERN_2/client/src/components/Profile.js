import React from 'react';
import { connect } from 'react-redux';
import { getProfileById } from '../actions/profile';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';
import ProfileAbout from './ProfileAbout';
import ProfileHeader from './ProfileHeader';
import { useEffect } from 'react';
import ProfileCred from './ProfileCred';
import ProfileGithub from './ProfileGithub';

export const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, []);

  return (
    <div className='container mt-5'>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <div>
          <div className='mt-5 mb-5'>
            <Link to='/profiles' className='btn-light btn mr-3'>
              Back to profiles
            </Link>
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id === profile.user._id && (
                <Link to='/edit' className='btn btn-light'>
                  Edit profile
                </Link>
              )}
          </div>
          <div>
            <ProfileHeader profile={profile} />
            <ProfileAbout profile={profile} />
            <ProfileCred
              education={profile.education}
              experience={profile.experience}
            />
            {profile.githubusername ? (
              <ProfileGithub username={profile.githubusername} />
            ) : (
              <h5>No github repos</h5>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
