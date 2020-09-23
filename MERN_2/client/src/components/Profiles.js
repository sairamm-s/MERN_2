import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfiles } from '../actions/profile';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import ProfileItem from './ProfileItem';

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    return (
      <div className='container mt-5'>
        {this.props.profile.loading ? (
          <Spinner />
        ) : (
          <div>
            <h1 className='text-primary display-4 text-center'>Developers</h1>
            <p className='lead text-center'>
              <i className='fab fa-2x fa-connectdevelop mr-3'></i>Browse and
              connect with developers
            </p>
            <hr />
            {this.props.profile.profiles.length > 0 ? (
              this.props.profile.profiles.map((profile) => {
                return <ProfileItem key={profile._id} profile={profile} />;
              })
            ) : (
              <h4>No profiles found</h4>
            )}
          </div>
        )}
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
