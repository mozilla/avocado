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
  combineReducers({ experiments, date}),
  applyMiddleware(logger, crashReporter, thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <ExperimentList />
    <DatePicker />
  </Provider>,
  document.getElementById("root")
);
