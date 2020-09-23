import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileTop = ({ profile }) => {
  return (
    // <div className='row'>
    //   <div className='col-12'>
    //     <div class='media'>
    //       <img
    //         src={profile.user.avatar}
    //         class='align-self-start mr-3'
    //         alt='...'
    //       />
    //       <div class='media-body'>
    //         <h5 class='mt-0'>{profile.user.name}</h5>
    //         <h6>
    //           {profile.status}
    //           {profile.company && <span> at {profile.company}</span>}{' '}
    //         </h6>
    //         <h6>{profile.location && <span>{profile.location}</span>} </h6>
    //         {profile.website && (
    //           <a
    //             href={profile.website}
    //             target='_blank'
    //             rel='noopener noreferrer'
    //           >
    //             <i className='fas fa-globe fa-2x mr-2'></i>
    //           </a>
    //         )}
    //         {profile.social.twitter && (
    //           <a
    //             href={profile.social.twitter}
    //             target='_blank'
    //             rel='noopener noreferrer'
    //           >
    //             <i className='fab fa-twitter fa-2x mr-2'></i>
    //           </a>
    //         )}
    //         {profile.social.facebook && (
    //           <a
    //             href={profile.social.facebook}
    //             target='_blank'
    //             rel='noopener noreferrer'
    //           >
    //             <i className='fab fa-facebook fa-2x mr-2'></i>
    //           </a>
    //         )}
    //         {profile.social.instagram && (
    //           <a
    //             href={profile.social.instagram}
    //             target='_blank'
    //             rel='noopener noreferrer'
    //           >
    //             <i className='fab fa-instagram fa-2x mr-2'></i>
    //           </a>
    //         )}
    //         {profile.social.youtube && (
    //           <a
    //             href={profile.social.youtube}
    //             target='_blank'
    //             rel='noopener noreferrer'
    //           >
    //             <i className='fab fa-youtube fa-2x mr-2'></i>
    //           </a>
    //         )}
    //         {profile.social.linkedin && (
    //           <a
    //             href={profile.social.linkedin}
    //             target='_blank'
    //             rel='noopener noreferrer'
    //           >
    //             <i className='fab fa-linkedin fa-3x mr-2'></i>
    //           </a>
    //         )}
    //         <p>Skills:{profile.skills}</p>
    //         <p> {profile.bio ? profile.bio : ''}</p>
    //         {profile.experience.length > 0 ? (
    //           <>
    //             {profile.experience.map((exp) => {
    //               return (
    //                 <>
    //                   <p>
    //                     {exp.title} at {exp.company}{' '}
    //                   </p>
    //                  </>
    //               );
    //             })}
    //           </>
    //         ) : (
    //           <p>No Experience credentials found</p>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className='row'>
      <div className='col-md-12'>
        <div className='card card-body bg-light mb-3 mt-3'>
          <img
            src={profile.user.avatar}
            class='align-self-start mr-3'
            alt='...'
          />
          <h3 className='text-center text-capitalize text-dark'></h3>
          <p className='lead'></p>
          <hr />
          <h3 className='text-center text-dark'>Skill Set</h3>
          <div className='row'>
            <div className='d-flex flex-wrap justify-content-center align-items-center'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.func.isRequired,
};

export default ProfileTop;
