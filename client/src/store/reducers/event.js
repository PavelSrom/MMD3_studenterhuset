import { GET_TODAY_EVENTS, POST_NEW_EVENT } from '../actions/types'

const initialState = {
  todayEvents: []
}

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TODAY_EVENTS:
      return {
        ...state,
        todayEvents: action.payload
      }
    case POST_NEW_EVENT:
      // if the date of today doesn't match with the new event's target date,
      // we don't wanna add it to our events for today and update the UI
      // we want to return the old state as it was before
      // it gets added to the database, but not to our UI
      if (new Date().toLocaleDateString() !== action.payload.targetDate) {
        return state
      }
      // otherwise, we want to add it to today events
      return {
        ...state,
        todayEvents: [action.payload, ...state.todayEvents]
      }
    default:
      return state
  }
}

export default eventReducer
