import React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from 'react-redux'
import App from "./App"
import { createStore, combineReducers, applyMiddleware } from 'redux'
import  experimentReducer from './reducer'

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}
  
const crashReporter = store => next => action => {
  try {
    return next(action)
  } catch (err) {
    console.error('Caught an exception!', err)
    throw err
  }
}

const store = createStore(
  experimentReducer, 
  applyMiddleware(logger, crashReporter)
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
)