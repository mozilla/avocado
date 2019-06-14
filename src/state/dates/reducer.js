import { combineReducers } from "redux-immutable";
import { START_DATE_SELECTED } from "../action-types";

const date = (state = "None selected", action) => {
  switch (action.type) {
    case START_DATE_SELECTED:
      return action.data;
    default:
      return state;
  }
};

export default combineReducers({ dates: date });
