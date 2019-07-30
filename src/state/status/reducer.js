import { combineReducers } from "redux-immutable";
import { STATUS_SELECTED } from "../action-types";

export const selectedStatus = (state = null, action) => {
    switch (action.type) {
      case STATUS_SELECTED:
        return action.data !== "" ? action.data : null;
      default:
        return state;
    }
  };
  
  export default combineReducers({ selectedStatus });
