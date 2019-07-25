import { STATUS_SELECTED } from "../action-types";

export const setStatus = (value) => dispatch => {
    dispatch({
      type: STATUS_SELECTED,
      data: value
    })
}
