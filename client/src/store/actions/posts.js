import {
  GET_POSTS,
  NEW_POST,
  VIEW_POST,
  DELETE_POST,
  ADD_COMMENT,
  DELETE_COMMENT
} from './types'
import axios from 'axios'

// function that fetches all posts
export const getAllPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts')
    console.log(res)
    dispatch({ type: GET_POSTS, payload: res.data })
  } catch (err) {
    console.log(err)
    // handle errors here
  }
}

// function that fetches a specific post by id
export const getPostById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${id}`)
    console.log(res)
    dispatch({ type: VIEW_POST, payload: res.data })
  } catch (err) {
    console.log(err)
  }
}

// function that creates a new post
export const createPost = text => async dispatch => {
  try {
    const res = await axios.post('/api/posts', { text })
    console.log(res)
    dispatch({ type: NEW_POST, payload: res.data })
  } catch (err) {
    console.log(err)
  }
}

// function that deletes a post by its id
export const deletePostById = id => async dispatch => {
  try {
    await axios.delete(`/api/posts/${id}`)
    console.log(res)
    dispatch({ type: DELETE_POST, payload: id })
  } catch (err) {
    console.log(err)
  }
}

export const commentOnPost = (postId, text) => async dispatch => {
  try {
    const res = await axios.post(`/api/posts/${postId}/comment`, { text })
    console.log(res)
    dispatch({ type: ADD_COMMENT, payload: res.data })
  } catch (err) {
    console.log(err)
  }
}

export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    const res = await axios.delete(`/api/posts/${postId}/${commentId}`)
    console.log(res)
    dispatch({ type: DELETE_COMMENT, payload: res.data })
  } catch (err) {
    console.log(err)
  }
}
