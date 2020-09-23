import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addExperience } from '../actions/profile';

class AddExperience extends Component {
  state = {
    company: '',
    title: '',
    location: '',
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
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      description: this.state.description,
    };
    this.props.addExperience(formData, this.props.history);
  };
  render() {
    return (
      <section className='container mt-5'>
        <h1 className='large text-primary'>Add An Experience</h1>
        <p className='lead'>
          <i className='fas fa-code-branch'></i> Add any developer/programming
          positions that you have had in the past
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
              placeholder='* Job Title'
              value={this.state.title}
              onChange={(e) => this.onChange(e)}
              name='title'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* 
               Company'
              className='form-control'
              value={this.state.company}
              onChange={(e) => this.onChange(e)}
              name='company'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              placeholder='Location'
              value={this.state.location}
              onChange={(e) => this.onChange(e)}
              name='location'
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

// const AddExperience = (props) => {
//   const [formData, setFormData] = useState({
//     company: '',
//     title: '',
//     location: '',
//     from: '',
//     to: '',
//     current: false,
//     description: '',
//   });

//   const [toDateDisabled, toggleDisabled] = useState(false);
//   const { company, title, location, from, to, current, description } = formData;
//   const onChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   return (
//     <section className='container'>
//       <h1 className='large text-primary'>Add An Experience</h1>
//       <p className='lead'>
//         <i className='fas fa-code-branch'></i> Add any developer/programming
//         positions that you have had in the past
//       </p>
//       <small>* = required field</small>
//       <form
//         className='form'
//         onSubmit={(e) => {
//           e.preventDefault();
//           props.addExperience(formData, props.history);
//         }}
//       >
//         <div className='form-group'>
//           <input
//             type='text'
//             placeholder='* Job Title'
//             value={title}
//             onChange={(e) => onChange(e)}
//             name='title'
//             required
//           />
//         </div>
//         <div className='form-group'>
//           <input
//             type='text'
//             placeholder='*
//            Company'
//             value={company}
//             onChange={(e) => onChange(e)}
//             name='company'
//             required
//           />
//         </div>
//         <div className='form-group'>
//           <input
//             type='text'
//             placeholder='Location'
//             value={location}
//             onChange={(e) => onChange(e)}
//             name='location'
//           />
//         </div>
//         <div className='form-group'>
//           <h4>From Date</h4>
//           <input
//             type='date'
//             value={from}
//             onChange={(e) => onChange(e)}
//             name='from'
//           />
//         </div>
//         <div className='form-group'>
//           <p>
//             <input
//               type='checkbox'
//               value={current}
//               checked={current}
//               onChange={(e) => {
//                 setFormData({ ...formData, current: !current });
//                 toggleDisabled(!toDateDisabled);
//               }}
//               name='current'
//               value=''
//             />{' '}
//             Current Job
//           </p>
//         </div>
//         <div className='form-group'>
//           <h4>To Date</h4>
//           <input
//             type='date'
//             value={to}
//             onChange={(e) => onChange(e)}
//             disabled={toDateDisabled ? 'disabled' : ''}
//             name='to'
//           />
//         </div>
//         <div className='form-group'>
//           <textarea
//             name='description'
//             value={description}
//             onChange={(e) => onChange(e)}
//             cols='30'
//             rows='5'
//             placeholder='Job Description'
//           ></textarea>
//         </div>
//         <input type='submit' className='btn btn-primary my-1' />
//         <Link className='btn btn-light my-1' to='/dashboard'>
//           Go Back
//         </Link>
//       </form>
//     </section>
//   );
// };

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(withRouter(AddExperience));
