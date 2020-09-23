import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../actions/post';
import { useState } from 'react';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');

  return (
    <div className='container'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addPost({ text });
          setText('');
        }}
      >
        <div className='form-group'>
          <h4>Add a post</h4>
          <textarea
            className='form-control'
            rows='3'
            required
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder='Create a post'
          ></textarea>
          <button className='btn mt-5 btn-success' type='submit'>
            Add post
          </button>
        </div>
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
