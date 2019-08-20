import React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import ExperimentList from "./components/experiments/ExperimentList";
import { Header } from "./components/header/Header";
import ConnectedDatePicker from "./components/dates/DatePicker";
import ConnectedTypeSelector from "./components/type/TypeSelector";
import ConnectedStatusSelector from "./components/status/StatusSelector";
import ConnectedExperimentGraph from "./components/experiments/ExperimentGraph";
import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux-immutable";
import experiments from "./state/experiments/reducer";
import dates from "./state/dates/reducer";
import type from "./state/type/reducer";
import status from "./state/status/reducer";
import thunk from "redux-thunk";
import { Map } from "immutable";
import { START_DATE_SELECTED, END_DATE_SELECTED } from "./state/action-types";
import './assets/avocado.scss';

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
  combineReducers({ experiments, dates, status, type }),
  new Map(),
  applyMiddleware(logger, crashReporter, thunk)
);

const App = () => (
  <React.Fragment>
    < Header />
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col">
          <ConnectedDatePicker onChangeAction={START_DATE_SELECTED} title={"Start Date"} colour={"red"} />
        </div>
        <div className="col">
          <ConnectedDatePicker onChangeAction={END_DATE_SELECTED} title={"End Date"} colour={"green"} />
        </div>
        <div className="col">
          <ConnectedStatusSelector />
        </div>
        <div className="col">
          <ConnectedTypeSelector />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <ConnectedExperimentGraph />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ExperimentList />
        </div>
      </div>
    </div>
  </React.Fragment>
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
