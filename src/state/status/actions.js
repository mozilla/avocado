import { STATUS_SELECTED } from "/state/action-types";

export const setStatus = value => (
  dispatch => {
    dispatch({
      type: STATUS_SELECTED,
      data: value
    });
  }
);
