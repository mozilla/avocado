import { EXPERIMENT_DATA_RECEIVED } from "avocado/state/action-types";
import * as packageJson from "package.json";
const process = require('process');

let experimenterUrl = packageJson.experimenter[process.env.EXPERIMENTER_TARGET];

/* istanbul ignore next */
if (!experimenterUrl) {
  experimenterUrl = packageJson.experimenter.dev;
}

export const fetchExperiments = () => dispatch => {
  fetch(experimenterUrl)
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: EXPERIMENT_DATA_RECEIVED,
        data: data
      });
    });
};
