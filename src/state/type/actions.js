import { TYPE_SELECTED } from "/state/action-types";

export const setType = value => (
  dispatch => {
    dispatch({
      type: TYPE_SELECTED,
      data: value
    });
  }
);
