import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../actions/post';
import { useState } from 'react';

const CommentForm = ({ addComment, id }) => {
  const [text, setText] = useState('');

  return (
    <div className='container'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addComment(id, { text });
          setText('');
        }}
      >
        <div className='form-group'>
          <h4>Leave a comment</h4>
          <textarea
            className='form-control'
            rows='3'
            required
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder='Add a comment...'
          ></textarea>
          <button className='btn mt-5 btn-success' type='submit'>
            Add comment
          </button>
        </div>
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
