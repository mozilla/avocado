import { STATUS_SELECTED } from "avocado/state/action-types";

export const setStatus = value => (
  dispatch => {
    dispatch({
      type: STATUS_SELECTED,
      data: value
    });
  }
);
