import {
  GET_POSTS,
  NEW_POST,
  VIEW_POST,
  DELETE_POST,
  ADD_COMMENT,
  DELETE_COMMENT
} from '../actions/types'

const initialState = {
  posts: [],
  currentPost: {}
}

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload
      }
    case NEW_POST:
      return {
        ...state,
        posts: [action.payload, ...posts]
      }
    case VIEW_POST:
      return {
        ...state,
        currentPost: action.payload
      }
    case DELETE_POST:
      return {
        ...state,
        posts: posts.filter(post => post._id !== action.payload)
      }
    case ADD_COMMENT:
    case DELETE_COMMENT:
      const targetIndex = posts.findIndex(
        post => post._id === action.payload._id
      )
      const newPosts = posts.splice(targetIndex, 1, action.payload)

      return {
        ...state,
        posts: newPosts
      }
    default:
      return state
  }
}

export default postReducer
