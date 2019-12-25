import { GET_ALL_ANNOUNCEMENTS, POST_NEW_ANNOUNCEMENT } from '../actions/types'

const initialState = {
  announcements: []
}

const announcementReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ANNOUNCEMENTS:
      return {
        ...state,
        announcements: action.payload
      }
    case POST_NEW_ANNOUNCEMENT:
      return {
        ...state,
        announcements: [action.payload, ...announcements]
      }
    default:
      return state
  }
}

export default announcementReducer
