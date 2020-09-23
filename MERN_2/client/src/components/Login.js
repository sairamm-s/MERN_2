import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/auth';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  onSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    const history = this.props.history;
    this.props.login({ user, history });
  };

  render() {
    if (this.props.auth) {
      return <Redirect to='/dashboard' />;
    }
    return (
      <div className='container mt-5'>
        <section className='login '>
          <h3 className='text-dark'>
            <i className='fas fa-user' style={{ marginRight: '0.2rem' }}></i>{' '}
            Login to your account
          </h3>
          <form className='form mt-5' onSubmit={this.onSubmit}>
            <div className='form-group'>
              <input
                type='email'
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
                placeholder='Email Address'
                name='email'
                class='form-control'
              />
              <small id='emailHelp' class='form-text text-muted'>
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className='form-group'>
              <input
                type='password'
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
                placeholder='Password'
                name='password'
                class='form-control'
              />
            </div>
            <input type='submit' className='btn btn-primary' value='Login' />
          </form>
          <p className='my-1 lead'>
            Don't have an account? <Link to='/Register'>Register</Link>
          </p>
        </section>
      </div>
    );
  }
}
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(withRouter(Login));
