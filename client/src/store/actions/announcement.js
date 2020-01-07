import { GET_ALL_ANNOUNCEMENTS, POST_NEW_ANNOUNCEMENT } from './types'
import axios from 'axios'

// this action runs when we want to get announcements from database
// it can be executed when a component renders, on a click of a button etc.
export const getAllAnnouncements = () => async dispatch => {
  try {
    // we make a request and wait for the response (array of objects)
    const res = await axios.get('/api/announcements')
    // our data lives in the 'data' property
    // when we have a response, we dispatch an event to Redux,
    // providing the received data (arr of obj) as a 'payload' property
    dispatch({ type: GET_ALL_ANNOUNCEMENTS, payload: res.data })
  } catch (err) {
    console.log(err)
  }
}

export const postNewAnnouncement = text => async dispatch => {
  try {
    const res = await axios.post('/api/announcements', { text })
    console.log(res)
    dispatch({ type: POST_NEW_ANNOUNCEMENT, payload: res.data })
  } catch (err) {
    console.log(err)
  }
}
