import {
  GET_MY_PROFILE,
  GET_ALL_PROFILES,
  GET_USER_PROFILE,
  CREATE_PROFILE,
  UPDATE_PROFILE,
  ADMIN_UPDATE_PROFILE
} from './types'
import axios from 'axios'

// get logged in user's profile
export const getMyProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me')
    console.log(res)
    dispatch({ type: GET_MY_PROFILE, payload: res.data })
  } catch (err) {
    console.log(err)
  }
}

// get all profiles
export const getAllProfiles = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile')
    console.log(res)
    dispatch({ type: GET_ALL_PROFILES, payload: res.data })
  } catch (err) {
    console.log(err)
  }
}

// get another user's profile by id
export const getProfileById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/${id}`)
    console.log(res)
    dispatch({ type: GET_USER_PROFILE, payload: res.data })
  } catch (err) {
    console.log(err)
  }
}

// create new user's profile
export const createProfile = formData => async dispatch => {
  try {
    const res = await axios.post('/api/profile', formData)
    console.log(res)
    dispatch({ type: CREATE_PROFILE, payload: res.data })
  } catch (err) {
    console.log(err)
  }
}

// update logged in user's profile
export const updateProfile = formData => async dispatch => {
  try {
    const res = await axios.put('/api/profile', formData)
    console.log(res)
    dispatch({ type: UPDATE_PROFILE, payload: res.data })
  } catch (err) {
    console.log(err)
  }
}

// update user profile by admins
export const adminUpdateProfile = (profileId, formData) => async dispatch => {
  try {
    // formData should be isFeatured or isAdmin
    // profileId must be mongo's _id
    const res = await axios.put(`/api/profile/${profileId}`, formData)
    console.log(res)
    dispatch({ type: ADMIN_UPDATE_PROFILE, payload: res.data })
  } catch (err) {
    console.log(err)
  }
}
