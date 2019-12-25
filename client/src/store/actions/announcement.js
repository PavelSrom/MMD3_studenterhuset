import { GET_ALL_ANNOUNCEMENTS, POST_NEW_ANNOUNCEMENT } from './types'
import axios from 'axios'

export const getAllAnnouncements = () => async dispatch => {
  try {
    const res = await axios.get('/api/announcements')
    console.log(res)
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
