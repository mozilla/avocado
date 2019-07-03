import React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import ExperimentList from "./components/experiments/ExperimentList";
import ConnectedDatePicker from "./components/dates/DatePicker";
import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux-immutable";
import experiments from "./state/experiments/reducer";
import date from "./state/dates/reducer";
import thunk from "redux-thunk";
import { START_DATE_SELECTED, END_DATE_SELECTED } from "./state/action-types";

const logger = () => next => action => {
  /* eslint-disable no-console */
  console.log("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  /* eslint-enable no-console */
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

const App = props => (<React.Fragment>
  <ExperimentList />
    <h4>Start Date: </h4>
    <ConnectedDatePicker onChangeAction={START_DATE_SELECTED} />
    <h4>End Date: </h4>
    <ConnectedDatePicker onChangeAction={END_DATE_SELECTED} />
</React.Fragment>)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
