import { combineReducers } from "redux-immutable";
import { START_DATE_SELECTED, END_DATE_SELECTED } from "../action-types";

export const startDate = (state = "None selected", action) => {
  switch (action.type) {
    case START_DATE_SELECTED:
      return action.data;
    default:
      return state;
  }
};

export const endDate = (state = "None selected", action) => {
  switch (action.type) {
    case END_DATE_SELECTED:
      return action.data;
    default:
      return state;
  }
};

export default combineReducers({ startDate, endDate });
