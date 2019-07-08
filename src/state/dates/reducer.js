import { combineReducers } from "redux-immutable";
import { START_DATE_SELECTED, END_DATE_SELECTED } from "../action-types";

const INITIAL_START_DATE = "";
const INITIAL_END_DATE = "";

export const startDate = (state = INITIAL_START_DATE, action) => {
  switch (action.type) {
    case START_DATE_SELECTED:
      return action.data;
    default:
      return state;
  }
};

export const endDate = (state = INITIAL_END_DATE, action) => {
  switch (action.type) {
    case END_DATE_SELECTED:
      return action.data;
    default:
      return state;
  }
};

export default combineReducers({ startDate, endDate });
