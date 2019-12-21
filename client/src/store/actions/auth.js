import axios from 'axios'
import { setAxiosToken } from '../../utils/setAxiosToken'
import {
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOADED_SUCCESS,
  LOADED_FAIL,
  DELETED_SUCCESS,
  DELETED_FAIL,
  LOGOUT
} from './types'

// verify user's token and let them go to dashboard
export const loadUser = () => async dispatch => {
  if (localStorage.token) setAxiosToken(localStorage.token)

  try {
    const res = await axios.get('/api/auth')
    dispatch({ type: LOADED_SUCCESS, payload: res.data })
  } catch (err) {
    console.log(err)
    dispatch({ type: LOADED_FAIL })
  }
}

// when the user wants to log in
export const loginUser = credentials => async dispatch => {
  try {
    const res = await axios.post('/api/auth/login', credentials)
    dispatch({ type: AUTH_SUCCESS, payload: res.data })
    dispatch(loadUser())
  } catch (err) {
    console.log(err)
    dispatch({ type: AUTH_FAIL })
  }
}

// when admin wants to delete user account
export const deleteUser = userId => async dispatch => {
  try {
    await axios.delete(`/api/auth/delete/${userId}`)
    dispatch({ type: DELETED_SUCCESS })
  } catch (err) {
    console.log(err)
    dispatch({ type: DELETED_FAIL })
  }
}

// when the user logs out
export const logoutUser = () => dispatch => {
  dispatch({ type: LOGOUT })
}
