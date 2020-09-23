import axios from 'axios';
import {
  ADD_POST,
  DELETE_POST,
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  ADD_COMMENT,
  DELETE_COMMENT,
} from './types';
import { toast } from 'react-toastify';

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:5000/api/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
    });
    toast.error(err.response.data, {
      position: toast.POSITION.TOP,
    });
  }
};

export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/posts/like/${postId}`
    );
    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
    });
    toast.error(err.response.data, {
      position: toast.POSITION.TOP,
    });
  }
};
export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/posts/unlike/${postId}`
    );
    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
    });
    toast.error(err.response.data, {
      position: toast.POSITION.TOP,
    });
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.delete(`http://localhost:5000/api/posts/${postId}`);
    dispatch({
      type: DELETE_POST,
      payload: postId,
    });
    toast.success('Post removed', {
      position: toast.POSITION.TOP_LEFT,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
    });
  }
};
export const addPost = (formData) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:5000/api/posts/', formData);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    toast.success('Post added', {
      position: toast.POSITION.TOP_LEFT,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
    });
  }
};

export const getPost = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/posts/${postId}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
    });
  }
};

export const addComment = (id, formData) => async (dispatch) => {
  try {
    const res = await axios.post(
      `http://localhost:5000/api/posts/comment/${id}`,
      formData
    );
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    toast.success('Comment added', {
      position: toast.POSITION.TOP_LEFT,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
    });
  }
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `http://localhost:5000/api/posts/comment/${postId}/${commentId}`
    );
    dispatch({
      type: DELETE_COMMENT,
      payload: commentId,
    });
    toast.error('Comment deleted', {
      position: toast.POSITION.TOP_LEFT,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
    });
  }
};
