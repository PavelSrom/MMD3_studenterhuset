import axios from 'axios'

// function that automatically makes axios use a valid token (if there's one)
export const setAxiosToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token
  } else {
    delete axios.defaults.headers.common['x-auth-token']
  }
}
