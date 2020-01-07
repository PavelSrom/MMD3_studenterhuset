import { GET_ALL_ANNOUNCEMENTS, POST_NEW_ANNOUNCEMENT } from '../actions/types'

// initial state for this reducer (empty array before making API request)
const initialState = {
  announcements: []
}

const announcementReducer = (state = initialState, action) => {
  /* our reducer is switching over the 'type' property, and has pre-defined
  ways how to change the state depending on the event it receives */
  switch (action.type) {
    case GET_ALL_ANNOUNCEMENTS:
      /* as soon as the reducer receives this particular event, it returns
      a new state and sets the 'announcements' property to our payload
      (array of objects) that is coming from the action ('payload: res.data') */
      return {
        ...state,
        announcements: action.payload
      }
    case POST_NEW_ANNOUNCEMENT:
      return {
        ...state,
        announcements: [action.payload, ...state.announcements]
      }
    default:
      return state
  }
}

export default announcementReducer
