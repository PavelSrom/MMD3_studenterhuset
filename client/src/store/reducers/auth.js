import {
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOADED_SUCCESS,
  LOADED_FAIL,
  DELETED_SUCCESS,
  DELETED_FAIL,
  LOGOUT
} from '../actions/types'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  user: null,
  requestSent: false
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        token: action.payload.token,
        requestSent: true
      }
    case LOADED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        requestSent: true,
        user: action.payload
      }
    case AUTH_FAIL:
    case LOADED_FAIL:
    case LOGOUT:
      localStorage.removeItem('token')
      return {
        ...state,
        isAuthenticated: false,
        requestSent: true,
        user: null
      }
    default:
      return state
  }
}

export default authReducer
