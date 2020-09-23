import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProfileItem extends Component {
  render() {
    return (
      <div className='media mt-5'>
        <img
          className='img-fluid mr-5'
          alt='userimage'
          src={this.props.profile.user.avatar}
        />
        <div className='media-body'>
          <h2 className=''>{this.props.profile.user.name}</h2>
          <p>
            {' '}
            {this.props.profile.status}{' '}
            {this.props.profile.company && (
              <span> at {this.props.profile.company} </span>
            )}{' '}
          </p>
          <Link
            to={`/profile/${this.props.profile.user._id}`}
            className='btn btn-primary mt-5'
          >
            View Profile
          </Link>
        </div>
      </div>
    );
  }
}

export default ProfileItem;
