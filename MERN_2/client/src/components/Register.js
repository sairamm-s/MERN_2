import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setAlert } from '../actions/alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from './Alert';
import { register } from '../actions/auth';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password1: '',
      password2: '',
    };
  }

  onSubmit = async (e) => {
    e.preventDefault();
    if (this.state.password1 !== this.state.password2) {
      // return this.props.setAlert('Passwords do not match', 'danger');
      toast.error('Passwords do not match', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      const user = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password1,
      };
      this.props.register({ user });
    }
  };

  render() {
    if (this.props.auth) {
      return <Redirect to='/login' />;
    } else {
      return (
        <div className='container mt-5'>
          <section className='register'>
            <h3 className='text-dark'>
              <i className='fas fa-user' style={{ marginRight: '0.2rem' }}></i>{' '}
              Sign Up
            </h3>
            <Alert />
            <form className='form mt-5' onSubmit={this.onSubmit}>
              <div className='form-group'>
                <input
                  className='form-control'
                  type='text'
                  value={this.state.name}
                  placeholder='Name'
                  name='name'
                  onChange={(e) => this.setState({ name: e.target.value })}
                  required
                />
              </div>
              <div className='form-group'>
                <input
                  type='email'
                  className='form-control'
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                  placeholder='Email Address'
                  name='email'
                  required
                />
                <small className='lead'>
                  This site uses Gravatar so if you want a profile image, use a
                  Gravatar email
                </small>
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  className='form-control'
                  value={this.state.password1}
                  onChange={(e) => this.setState({ password1: e.target.value })}
                  placeholder='Password'
                  name='password'
                  required
                />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  className='form-control'
                  value={this.state.password2}
                  onChange={(e) => this.setState({ password2: e.target.value })}
                  placeholder='Confirm Password'
                  name='password2'
                  required
                />
              </div>
              <input
                type='submit'
                className='btn btn-primary'
                value='Register'
              />
            </form>
            <p className='my-1 lead'>
              Already have an account? <Link to='/login'>Sign In</Link>
            </p>
          </section>
        </div>
      );
    }
  }
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  auth: state.auth.isAuthenticated,
});

// export default connect(null, { setAlert })(Register);

//  const Register = (props) => {
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     password1: '',
//     password2: '',
//   });
//   const onChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     if (form.password1 !== form.password2) {
//       props.setAlert('passwords do not match', 'danger');
//     }
//   };

//   return (
//     <div className='container'>
//       <h1 className='large text-primary'>Sign Up</h1>
//       <p className='lead'>
//         <i className='fas fa-user'></i> Create Your Account
//       </p>
//       <form className='form' onSubmit={(e) => onSubmit(e)}>
//         <div className='form-group'>
//           <input
//             type='text'
//             placeholder='Name'
//             value={form.name}
//             name='name'
//             onChange={(e) => onChange(e)}
//             required
//           />
//         </div>
//         <div className='form-group'>
//           <input
//             type='email'
//             placeholder='Email Address'
//             value={form.email}
//             onChange={(e) => onChange(e)}
//             name='email'
//           />
//           <small className='form-text'>
//             This site uses Gravatar so if you want a profile image, use a
//             Gravatar email
//           </small>
//         </div>
//         <div className='form-group'>
//           <input
//             type='password'
//             placeholder='Password'
//             onChange={(e) => onChange(e)}
//             value={form.password1}
//             name='password1'
//             minLength='6'
//           />
//         </div>
//         <div className='form-group'>
//           <input
//             type='password'
//             value={form.password2}
//             onChange={(e) => onChange(e)}
//             placeholder='Confirm Password'
//             name='password2'
//             minLength='6'
//           />
//         </div>
//         <input type='submit' className='btn btn-primary' value='Register' />
//       </form>
//       <p className='my-1'>
//         Already have an account? <Link to='/login'>Sign In</Link>
//       </p>
//     </div>
//   );
// };
export default connect(mapStateToProps, { setAlert, register })(Register);
