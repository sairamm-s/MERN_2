import React from 'react';

const ProfileHeader = (profile) => {
  return (
    <div className='row'>
      <div className='col-md-12'>
        <div className='card card-body bg-light text-white mb-3'>
          <div className='row text-center'>
            <div className='col-sm-12 col-xs-12 col-md-3 m-auto'>
              <img
                className='rounded-circle'
                src={profile.profile.user.avatar}
                alt=''
              />
            </div>
          </div>
          <div className='text-center'>
            <h1 className='display-4 mt-3 text-uppercase username text-dark text-center'>
              {profile.profile.user.name}
            </h1>
            <p className='lead text-dark text-center'>
              {profile.profile.status}{' '}
            </p>
            {profile.profile.social && profile.profile.social.twitter && (
              <a
                className='text-dark p-2'
                href={profile.profile.social.twitter}
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fab fa-twitter fa-2x' />
              </a>
            )}
            {profile.profile.social && profile.profile.social.facebook && (
              <a
                className='text-dark p-2'
                href={profile.profile.social.facebook}
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fab fa-facebook fa-2x' />
              </a>
            )}
            {profile.profile.social && profile.profile.social.youtube && (
              <a
                className='text-dark p-2'
                href={profile.profile.social.youtube}
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fab fa-youtube fa-2x' />
              </a>
            )}
            {profile.profile.social && profile.profile.social.instagram && (
              <a
                className='text-dark p-2'
                href={profile.profile.social.instagram}
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fab fa-instagram fa-2x' />
              </a>
            )}
            {profile.profile.social && profile.profile.social.linkedin && (
              <a
                className='text-dark p-2'
                href={profile.profile.social.linkedin}
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fab fa-linkedin fa-2x' />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
