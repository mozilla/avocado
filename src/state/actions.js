import { EXPERIMENT_DATA_RECEIVED } from "./types";
import { START_DATE_SELECTED } from "./types";

export const fetchExperiments = () => dispatch => {
  fetch("https://experimenter.services.mozilla.com/api/v1/experiments/")
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: EXPERIMENT_DATA_RECEIVED,
        data: data
      });
    });
};

export const setStartDate = (value) =>  dispatch => {
  dispatch({
    type: START_DATE_SELECTED,
    data: value
  })
}
