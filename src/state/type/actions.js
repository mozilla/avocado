import { TYPE_SELECTED } from "avocado/state/action-types";

export const setType = value => (
  dispatch => {
    dispatch({
      type: TYPE_SELECTED,
      data: value
    });
  }
);
