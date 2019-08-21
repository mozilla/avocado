import { EXPERIMENT_DATA_RECEIVED } from "../action-types";

export const fetchExperiments = () => dispatch => {
  fetch("https://stage.experimenter.nonprod.dataops.mozgcp.net/api/v1/experiments/")
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: EXPERIMENT_DATA_RECEIVED,
        data: data
      });
    });
};
