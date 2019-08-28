import { combineReducers } from "redux-immutable";
import { TYPE_SELECTED } from "/state/action-types";

export const selectedType = (state = null, action) => {
  switch (action.type) {
    case TYPE_SELECTED:
      return action.data ? action.data : null;
    default:
      return state;
  }
};

export default combineReducers({ selectedType });
