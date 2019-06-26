import React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import ExperimentList from "./components/experiments/ExperimentList";
import DatePicker from "./components/dates/DatePicker";
import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux-immutable";
import experiments from "./state/experiments/reducer";
import date from "./state/dates/reducer";
import thunk from "redux-thunk";

const logger = () => next => action => {
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
  combineReducers({ experiments, date }),
  applyMiddleware(logger, crashReporter, thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <ExperimentList />
    <h4>Start Date: </h4>
    <DatePicker />
    <h4>End Date:</h4>
    <DatePicker />
  </Provider>,
  document.getElementById("root")
);
