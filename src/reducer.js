import { fromJS, List } from 'immutable';
import { combineReducers } from 'redux-immutable';

const experiments = (state = List(), action) => {
  switch(action.type) {
    case "EXPERIMENT_DATA_RECEIVED":
      return fromJS(action.data);
    default:
      return state;
  }
}

export default combineReducers({ items: experiments });