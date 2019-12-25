import { GET_TODAY_EVENTS, POST_NEW_EVENT } from './types'
import axios from 'axios'

export const getTodayEvents = () => async dispatch => {
  try {
    const res = await axios.get('/api/events')
    console.log(res)
    dispatch({ type: GET_TODAY_EVENTS, payload: res.data })
  } catch (err) {
    console.log(err)
  }
}

export const postNewEvent = formData => async dispatch => {
  try {
    const res = await axios.post('/api/events', formData)
    console.log(res)
    dispatch({ type: POST_NEW_EVENT, payload: res.data })
  } catch (err) {
    console.log(err)
  }
}
