import { combineReducers } from "redux-immutable";
import { TYPE_SELECTED } from "avocado/state/action-types";

export const selectedType = (state = [], action) => {
  switch (action.type) {
    case TYPE_SELECTED:
      return action.data ? action.data : null;
    default:
      return state;
  }
};

export default combineReducers({ selectedType });
