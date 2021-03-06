// we create these to avoid typing errors
// then we import them in our action and reducer files

// AUTH
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_FAIL = 'AUTH_FAIL'
export const LOADED_SUCCESS = 'LOADED_SUCCESS'
export const LOADED_FAIL = 'LOADED_FAIL'
export const DELETED_SUCCESS = 'DELETED_SUCCESS'
export const DELETED_FAIL = 'DELETED_FAIL'
export const LOGOUT = 'LOGOUT'

// PROFILE
export const GET_MY_PROFILE = 'GET_MY_PROFILE'
export const GET_ALL_PROFILES = 'GET_ALL_PROFILES'
export const GET_USER_PROFILE = 'GET_USER_PROFILE'
export const CREATE_PROFILE = 'CREATE_PROFILE'
export const UPDATE_PROFILE = 'UPDATE_PROFILE'
export const ADMIN_UPDATE_PROFILE = 'ADMIN_UPDATE_PROFILE'

// POSTS
export const GET_POSTS = 'GET_POSTS'
export const NEW_POST = 'NEW_POST'
export const VIEW_POST = 'VIEW_POST'
export const DELETE_POST = 'DELETE_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

// EVENTS
export const GET_TODAY_EVENTS = 'GET_TODAY_EVENTS'
export const POST_NEW_EVENT = 'POST_NEW_EVENT'

// ANNOUNCEMENTS
export const GET_ALL_ANNOUNCEMENTS = 'GET_ALL_ANNOUNCEMENTS'
export const POST_NEW_ANNOUNCEMENT = 'POST_NEW_ANNOUNCEMENT'
