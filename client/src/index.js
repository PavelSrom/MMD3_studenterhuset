// REACT
import React from 'react' // so that we can use JSX
import ReactDOM from 'react-dom' // package that takes care of actually rendering the app to the screen
// REDUX
import { createStore, applyMiddleware } from 'redux' // helper functions for store creation
import { Provider } from 'react-redux' // <App /> needs to be inside this component
import { composeWithDevTools } from 'redux-devtools-extension' // debugging in the browser stuff
import thunk from 'redux-thunk' // async operations in Redux
import rootReducer from './store' // merges all reducers together, needed for store creation
// OTHER
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './index.css'
import App from './App' // our entire app component

// creating a Redux store
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
