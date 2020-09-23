import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { addLike, removeLike, deletePost } from '../actions/post';

const PostItem = ({
  auth,
  post: { _id, text, name, avatar, likes, user, comments, date },
  addLike,
  removeLike,
  deletePost,
  showActions,
}) => {
  return (
    <div className='p-1 my-1 mb-5 card'>
      <div className='row'>
        <div className='col-md-3 col-sm-12 text-center'>
          <img className='round-img mr-3 mb-3' src={avatar} alt='' />
          <Link to={`profile/${user}`} className='mt-5'>
            Posted by {name}
          </Link>
        </div>
        <div className='col-md-9 col-sm-12'>
          <p className='my-1'>{text}</p>
          <p className='text-muted'>
            Posted on <Moment format='DD/MM/YYYY'>{date}</Moment>{' '}
          </p>

          {showActions && (
            <>
              <button
                type='button'
                onClick={() => addLike(_id)}
                className='btn btn-primary mr-2'
              >
                <i className='fas fa-thumbs-up mr-2'></i>
                {likes.length > 0 && <span>{likes.length}</span>}
              </button>
              <button
                type='button'
                onClick={() => removeLike(_id)}
                className='btn btn-danger mr-2'
              >
                <i className='fas fa-thumbs-down mr-2'></i>
                <span> </span>
              </button>
              <Link to={`/post/${_id}`} className='btn btn-primary mr-2'>
                Discussion{' '}
                {comments.length > 0 && (
                  <span className='badge badge-light'>{comments.length}</span>
                )}
              </Link>
              {!auth.loading && user === auth.user._id && (
                <button
                  onClick={() => deletePost(_id)}
                  type='button'
                  className='btn btn-danger '
                >
                  <i className='fas fa-times'></i>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
