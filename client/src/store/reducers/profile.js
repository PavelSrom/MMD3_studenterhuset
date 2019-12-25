import {
  GET_MY_PROFILE,
  GET_ALL_PROFILES,
  GET_USER_PROFILE,
  CREATE_PROFILE,
  UPDATE_PROFILE,
  ADMIN_UPDATE_PROFILE
} from '../actions/types'

const initialState = {
  profiles: [],
  myProfile: {},
  userProfile: {}
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_PROFILE:
    case CREATE_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        myProfile: action.payload
      }
    case GET_ALL_PROFILES:
      return {
        ...state,
        profiles: action.payload
      }
    case GET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload
      }
    case ADMIN_UPDATE_PROFILE:
      const targetIndex = profiles.findIndex(
        profile => profile._id === action.payload._id
      )
      const newProfiles = profiles.splice(targetIndex, 1, action.payload)

      return {
        ...state,
        profiles: newProfiles
      }
    default:
      return state
  }
}

export default profileReducer
