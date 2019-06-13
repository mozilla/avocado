import React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import DatePicker from "./components/DatePicker";
import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux-immutable";
import experiments from "./state/reducer";
import startDate from "./state/dateReducer";
import thunk from "redux-thunk";

const logger = store => next => action => {
  console.log("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
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
  combineReducers({ experiments, startDate }),
  applyMiddleware(logger, crashReporter, thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
    <DatePicker />
  </Provider>,
  document.getElementById("root")
);
