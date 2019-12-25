import { combineReducers } from 'redux'
import auth from './reducers/auth'
import profile from './reducers/profile'
import post from './reducers/posts'
import event from './reducers/event'
import announcement from './reducers/announcement'

const rootReducer = combineReducers({
  auth,
  profile,
  post,
  event,
  announcement
})

export default rootReducer
