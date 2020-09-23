import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../actions/post';
import Spinner from './Spinner';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <div className='mt-5 container'>
      <Link className='btn btn-light' to='/posts'>
        Back to posts
      </Link>
      <div className='p-1 my-1 mt-4 mb-5 card'>
        <div className='row'>
          <div className='col-md-3 col-sm-12 text-center'>
            <img className='round-img mr-3 mb-3' src={post.avatar} alt='' />
            <p>Posted by {post.name}</p>
          </div>
          <div className='col-md-9 col-sm-12'>
            <p className='my-1'>{post.text}</p>
            <p className='text-muted'>
              Posted on <Moment format='DD/MM/YYYY'>{post.date}</Moment>{' '}
            </p>
          </div>
        </div>
      </div>
      <CommentForm id={post._id} />
      <div>
        {post.comments.map((comment) => {
          return (
            <CommentItem
              key={comment._id}
              comment={comment}
              postId={post._id}
            />
          );
        })}
      </div>
    </div>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
