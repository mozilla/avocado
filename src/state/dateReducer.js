import { fromJS, List } from "immutable";
import { combineReducers } from "redux-immutable";
import { START_DATE_SELECTED } from "./types";

const startDate = (state = "None selected", action) => {
  switch (action.type) {
    case START_DATE_SELECTED:
      return action.data;
    default:
      return state;
  }
};

export default combineReducers({ dates: startDate });
