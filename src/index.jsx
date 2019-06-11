import React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux-immutable";
import experiments from "./state/reducer";
import thunk from "redux-thunk";

const logger = () => next => action => {
  let result = next(action);
  return result;
};

const crashReporter = () => next => action => {
  try {
    return next(action);
  } catch (err) {
    throw err;
  }
};

const store = createStore(
  combineReducers({ experiments }),
  applyMiddleware(logger, crashReporter, thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
