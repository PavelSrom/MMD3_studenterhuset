import { combineReducers } from 'redux' // helper function
// reducers
import auth from './reducers/auth'
import profile from './reducers/profile'
import post from './reducers/posts'
import event from './reducers/event'
import announcement from './reducers/announcement'

// root reducer that merges all of our reducers together
const rootReducer = combineReducers({
  auth,
  profile,
  post,
  event,
  announcement
})

export default rootReducer
