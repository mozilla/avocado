import { START_DATE_SELECTED } from "../action-types";

export const setStartDate = (value) =>  dispatch => {
    dispatch({
      type: START_DATE_SELECTED,
      data: value
    })
}