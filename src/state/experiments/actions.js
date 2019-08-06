import { EXPERIMENT_DATA_RECEIVED } from "../action-types";

export const fetchExperiments = () => dispatch => {
  fetch("https://localhost/api/v1/experiments/")
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: EXPERIMENT_DATA_RECEIVED,
        data: data
      });
    });
};
