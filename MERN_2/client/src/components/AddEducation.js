import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addEducation } from '../actions/profile';

class AddEducation extends Component {
  state = {
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
    toggleDisabled: false,
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const formData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      description: this.state.description,
    };
    this.props.addEducation(formData, this.props.history);
  };
  render() {
    return (
      <section className='container mt-5'>
        <h1 className='large text-primary'>Add Education</h1>
        <p className='lead'>
          <i className='fas fa-code-branch'></i> Add any Courses or degree that
          you have completed
        </p>
        <small>* = required field</small>
        <form
          className='form'
          onSubmit={(e) => {
            this.onSubmit(e);
          }}
        >
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              placeholder='* Degree or certification'
              value={this.state.degree}
              onChange={(e) => this.onChange(e)}
              name='degree'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              placeholder='* School or college'
              value={this.state.school}
              onChange={(e) => this.onChange(e)}
              name='school'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              placeholder='Field of study'
              value={this.state.fieldofstudy}
              onChange={(e) => this.onChange(e)}
              name='fieldofstudy'
            />
          </div>
          <div className='form-group'>
            <h4>From Date</h4>
            <input
              type='date'
              className='form-control'
              value={this.state.from}
              onChange={(e) => this.onChange(e)}
              name='from'
            />
          </div>
          <div className='form-group'>
            <p>
              <input
                type='checkbox'
                value={this.state.current}
                onChange={(e) => {
                  this.setState({
                    toggleDisabled: !this.state.toggleDisabled,
                  });
                }}
                name='current'
              />{' '}
              Current Job
            </p>
          </div>
          <div className='form-group'>
            <h4>To Date</h4>
            <input
              type='date'
              className='form-control'
              value={this.state.to}
              onChange={(e) => this.onChange(e)}
              disabled={this.state.toggleDisabled ? 'disabled' : ''}
              name='to'
            />
          </div>
          <div className='form-group'>
            <textarea
              name='description'
              className='form-control'
              value={this.state.description}
              onChange={(e) => this.onChange(e)}
              cols='30'
              rows='5'
              placeholder='Job Description'
            ></textarea>
          </div>
          <input type='submit' className='btn btn-primary my-1 mr-4' />
          <Link className='btn btn-light my-1' to='/dashboard'>
            Go Back
          </Link>
        </form>
      </section>
    );
  }
}
AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(withRouter(AddEducation));
