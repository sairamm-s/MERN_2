import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile } from '../actions/profile';
import Alert from './Alert';

class CreateProfile extends Component {
  state = {
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    instagram: '',
    linkedin: '',
    youtube: '',
    displaySocial: false,
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onsubmit = async (e) => {
    e.preventDefault();

    const formData = {
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      instagram: this.state.instagram,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
    };
    this.props.createProfile(formData, this.props.history);
  };
  render() {
    return (
      <section className='container mt-5'>
        <Alert />
        <h1 className='large text-primary'>Create Your Profile</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Let's get some information to make
          your profile stand out
        </p>
        <small>* = required field</small>
        <form className='form' onSubmit={this.onsubmit}>
          <div className='form-group'>
            <select
              name='status'
              value={this.state.status}
              className='form-control'
              onChange={this.onChange}
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
              type='text'
              placeholder='Company'
              className='form-control'
              value={this.state.company}
              onChange={this.onChange}
              name='company'
            />
            <small className='form-text'>
              Could be your own company or one you work for
            </small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Website'
              className='form-control'
              value={this.state.website}
              onChange={this.onChange}
              name='website'
            />
            <small className='form-text'>
              Could be your own or a company website
            </small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              placeholder='Location'
              onChange={this.onChange}
              value={this.state.location}
              name='location'
            />
            <small className='form-text'>
              City & state suggested (eg. Boston, MA)
            </small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              placeholder='* Skills'
              onChange={this.onChange}
              value={this.state.skills}
              name='skills'
            />
            <small className='form-text'>
              Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
            </small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Github Username'
              className='form-control'
              onChange={this.onChange}
              value={this.state.githubusername}
              name='githubusername'
            />
            <small className='form-text'>
              If you want your latest repos and a Github link, include your
              username
            </small>
          </div>
          <div className='form-group'>
            <textarea
              placeholder='A short bio of yourself'
              onChange={this.onChange}
              value={this.state.bio}
              className='form-control'
              name='bio'
            ></textarea>
            <small className='form-text'>Tell us a little about yourself</small>
          </div>

          <div className='my-2'>
            <button
              type='button'
              onClick={() =>
                this.setState({
                  displaySocial: !this.state.displaySocial,
                })
              }
              className='btn btn-light mr-3'
            >
              Add Social Network Links
            </button>
            <span>Optional</span>
          </div>

          {this.state.displaySocial && (
            <>
              <div className='form-group social-input'>
                <i className='fab fa-twitter fa-2x'></i>
                <input
                  type='text'
                  placeholder='Twitter URL'
                  onChange={this.onChange}
                  className='form-control'
                  value={this.state.twitter}
                  name='twitter'
                />
              </div>

              <div className='form-group social-input'>
                <i className='fab fa-facebook fa-2x'></i>
                <input
                  type='text'
                  placeholder='Facebook URL'
                  onChange={this.onChange}
                  className='form-control'
                  value={this.state.facebook}
                  name='facebook'
                />
              </div>

              <div className='form-group social-input'>
                <i className='fab fa-youtube fa-2x'></i>
                <input
                  type='text'
                  placeholder='YouTube URL'
                  onChange={this.onChange}
                  className='form-control'
                  value={this.state.youtube}
                  name='youtube'
                />
              </div>

              <div className='form-group social-input'>
                <i className='fab fa-linkedin fa-2x'></i>
                <input
                  type='text'
                  placeholder='Linkedin URL'
                  onChange={this.onChange}
                  className='form-control'
                  value={this.state.linkedin}
                  name='linkedin'
                />
              </div>

              <div className='form-group social-input'>
                <i className='fab fa-instagram fa-2x'></i>
                <input
                  type='text'
                  placeholder='Instagram URL'
                  className='form-control'
                  value={this.state.instagram}
                  onChange={this.onChange}
                  name='instagram'
                />
              </div>
            </>
          )}

          <input type='submit' className='btn btn-primary my-1' />
          <a className='btn btn-light my-1' href='dashboard.html'>
            Go Back
          </a>
        </form>
      </section>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

// const mapStateToProps = state =>({

// })

export default connect(null, { createProfile })(withRouter(CreateProfile));
