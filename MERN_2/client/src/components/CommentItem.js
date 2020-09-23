import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../actions/post';

const CommentItem = ({
  postId,
  auth,
  deleteComment,
  comment: { _id, text, name, avatar, user, date },
}) => {
  return (
    <div className='media mb-5'>
      <img src={avatar} className='mr-3' alt='...' />
      <div className='media-body'>
        <h5 className='mt-0'>{name}</h5>
        <p>{text}</p>
        <p>
          Commented on <Moment format='DD/MM/YYYY'>{date}</Moment>{' '}
        </p>
        {!auth.loading && user === auth.user._id && (
          <button
            className='btn-danger btn'
            onClick={(e) => deleteComment(postId, _id)}
          >
            <i className='fas fa-times'></i>
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStatetoProps, { deleteComment })(CommentItem);
