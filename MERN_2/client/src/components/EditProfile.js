import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../actions/profile';
import Alert from './Alert';
import { useState } from 'react';
import { useEffect } from 'react';

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  });
  const [displaySocial, toggleSocial] = useState(false);
  useEffect(() => {
    getCurrentProfile();

    if (!loading && profile) {
      setFormData({
        company: profile.company ? profile.company : '',
        website: profile.website ? profile.website : '',
        location: profile.location ? profile.location : '',
        status: profile.status ? profile.status : '',
        skills: profile.skills ? profile.skills : '',
        githubusername: profile.githubusername ? profile.githubusername : '',
        bio: profile.bio ? profile.bio : '',
        twitter:
          profile.social && profile.social.twitter
            ? profile.social.twitter
            : '',
        facebook:
          profile.social && profile.social.facebook
            ? profile.social.facebook
            : '',
        linkedin:
          profile.social && profile.social.linkedin
            ? profile.social.linkedin
            : '',
        youtube:
          profile.social && profile.social.youtube
            ? profile.social.youtube
            : '',
        instagram:
          profile.social && profile.social.instagram
            ? profile.social.instagram
            : '',
      });
    }
  }, [loading]);
  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <section className='container mt-5'>
      <Alert />
      <h1 className=' text-primary'>Edit Your Profile</h1>

      <small>* = required field</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <select
            className='form-control'
            name='status'
            value={status}
            onChange={onChange}
          >
            <option value='0'>* Select Professional Status</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>Student or Learning</option>
            <option value='Instructor'>Instructor or Teacher</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </select>
          <small className='form-text'>
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className='form-group'>
          <input
            className='form-control'
            type='text'
            placeholder='Company'
            value={company}
            onChange={(e) => onChange(e)}
            name='company'
          />
          <small className='form-text'>
            Could be your own company or one you work for
          </small>
        </div>
        <div className='form-group'>
          <input
            className='form-control'
            type='text'
            placeholder='Website'
            value={website}
            onChange={(e) => onChange(e)}
            name='website'
          />
          <small className='form-text'>
            Could be your own or a company website
          </small>
        </div>
        <div className='form-group'>
          <input
            className='form-control'
            type='text'
            placeholder='Location'
            onChange={(e) => onChange(e)}
            value={location}
            name='location'
          />
          <small className='form-text'>
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className='form-group'>
          <input
            className='form-control'
            type='text'
            placeholder='* Skills'
            onChange={(e) => onChange(e)}
            value={skills}
            name='skills'
          />
          <small className='form-text'>
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className='form-group'>
          <input
            className='form-control'
            type='text'
            placeholder='Github Username'
            onChange={(e) => onChange(e)}
            value={githubusername}
            name='githubusername'
          />
          <small className='form-text'>
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className='my-2'>
          <button
            type='button'
            onClick={() => toggleSocial(!displaySocial)}
            className='btn btn-light'
          >
            Edit Social Network Links
          </button>
        </div>

        {displaySocial && (
          <>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x mr-3'></i>
              <input
                type='text'
                placeholder='Twitter URL'
                onChange={(e) => onChange(e)}
                value={twitter}
                name='twitter'
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x mr-3'></i>
              <input
                type='text'
                placeholder='Facebook URL'
                onChange={(e) => onChange(e)}
                value={facebook}
                name='facebook'
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x mr-3'></i>
              <input
                type='text'
                placeholder='YouTube URL'
                onChange={(e) => onChange(e)}
                value={youtube}
                name='youtube'
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x mr-3'></i>
              <input
                type='text'
                placeholder='Linkedin URL'
                onChange={(e) => onChange(e)}
                value={linkedin}
                name='linkedin'
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x mr-3'></i>
              <input
                type='text'
                placeholder='Instagram URL'
                value={instagram}
                onChange={(e) => onChange(e)}
                name='instagram'
              />
            </div>
          </>
        )}
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </section>
  );
};
EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
