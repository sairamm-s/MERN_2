import React from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({ profile }) => {
  const skillss = profile.skills.map((skill, index) => (
    <div key={index} className='p-3'>
      {skill}
    </div>
  ));
  return (
    <div>
      {' '}
      <div className='row'>
        <div className='col-md-12'>
          <div className='card card-body bg-light mb-3 mt-3'>
            <h3 className='text-center text-capitalize text-dark'>
              {profile.user.name}'s Bio
            </h3>
            {profile.bio ? (
              <> {profile.bio} </>
            ) : (
              <> {profile.user.name} does not have a bio </>
            )}
            <hr />
            <h3 className='text-center text-dark'>Skill Set</h3>
            <p className='lead text-center'>{skillss}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
