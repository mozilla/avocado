import { fromJS, List } from "immutable";
import { combineReducers } from "redux-immutable";
import { EXPERIMENT_DATA_RECEIVED } from "./types";

const experiments = (state = List(), action) => {
  switch (action.type) {
    case EXPERIMENT_DATA_RECEIVED:
      return fromJS(action.data);
    default:
      return state;
  }
};

export default combineReducers({ items: experiments });
