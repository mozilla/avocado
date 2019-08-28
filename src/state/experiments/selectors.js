import { getStartDatepickerTimestamp, getEndDatepickerTimestamp} from '/state/dates/selectors';
import { getType } from '/state/type/selectors'
import { getStatus } from '/state/status/selectors';
import { STATUSES } from '/constants';
import { STATUS_DRAFT, STATUS_REVIEW, STATUS_SHIP, STATUS_ACCEPTED, STATUS_LIVE, STATUS_COMPLETE, SECONDS_IN_A_DAY} from '/constants';

const getExperiments = state =>
  state.getIn(["experiments", "items"]);

export const getExperimentsCount = state =>
  getExperiments(state).size;

export const getFilteredExperiments = (state) => {
  const experiments = getExperiments(state); 
  const selectedStartTimestamp = getStartDatepickerTimestamp(state);
  const selectedEndTimestamp = getEndDatepickerTimestamp(state);
  const selectedType = getType(state);
  const selectedStatusPriority = STATUSES[getStatus(state)];

  return experiments.filter(experiment => {
    const startDate = experiment.get("start_date");
    const endDate = experiment.get("end_date");
    const type = experiment.get("type");
    const experimentStatus = experiment.get("status");
    const experimentStatusPriority = STATUSES[experimentStatus];

    if (selectedStartTimestamp) {
      if (startDate && (startDate < selectedStartTimestamp)) {
        return false;
      } else if (!startDate) {
        return false;
      }
    }
    if (selectedEndTimestamp) {
      if (endDate && (endDate >= selectedEndTimestamp)) {
        return false;
      } else if (!endDate) {
        return false;
      }
    }
    if (selectedType && (type !== selectedType)) {
      return false;
    }
    if (selectedStatusPriority && (selectedStatusPriority > experimentStatusPriority)) {
      return false;
    }

    return true;
  });
}

/**
 * Return an array with the median values of number of days an experiment has spent at each stage.
 * The returned array will be used as input for the graph.
 * 
 *  - Example: [0, 5, 2, 5, 2, 1, 6]
 */
export const getMedianArray = (state) => {
  const medianArray = [];
  const statuses = {
    [STATUS_DRAFT]: [],
    [STATUS_REVIEW]: [],
    [STATUS_SHIP]: [],
    [STATUS_ACCEPTED]: [],
    [STATUS_LIVE]: [],
    [STATUS_COMPLETE]: []
  }
  const statusDates = getExperimentStatusToDaysData(state);

  statusDates.forEach(statusObject => {
    Object.keys(statusObject).forEach(key => {
      if (statusObject[key]) {
        statuses[key].push(statusObject[key])
      }
    });
  });

  Object.keys(statuses).forEach(key => {
    medianArray.push(getMedian(statuses[key]))
  });

  return medianArray;
}

/**
 * Return a list of dictionary objects. 
 * 
 * Each dictionary corresponds to an experiment, and how many days it spent at each status (there are 6)
 *  - key:  status
 *  - value: how many days it remained in the status
 *  - example: Object { Draft: 12, Review: 1, Ship: 10, Accepted: null, Live: null, Complete: null }
 * 
 * This is used as a helper function for getMedianArray.
 */
export const getExperimentStatusToDaysData = (state) => {
  const experiments = getFilteredExperiments(state);

  return experiments.map(experiment => {
    const statusesToNumDays = initializeStatusArray(null);

    const changes = experiment.get("changes");
    let oldDate = null;
    let oldStatus = null;

    changes.forEach((changelog) => {
      const changedDate = changelog.get("changed_on");
      const newStatus = changelog.get("new_status");
  
      if (oldDate && oldStatus) {
        if (statusesToNumDays[oldStatus] == null) {
          statusesToNumDays[oldStatus] = getNumberDaysBetweenDates(oldDate, changedDate)
        } else {
          statusesToNumDays[oldStatus] += getNumberDaysBetweenDates(oldDate, changedDate)
        }
      }

      oldDate = changedDate;
      oldStatus = newStatus;
    });

    console.log(statusesToNumDays);
    return statusesToNumDays;
  })
}

/**
 * Return the number of days between given two dates.
 */
export const getNumberDaysBetweenDates = (oldDate, newDate) => {
  const date1 = new Date(oldDate);
  const date2 = new Date(newDate);

  const seconds = Math.abs(date1 - date2) / 1000; // convert from milliseconds to seconds
  const days = seconds / SECONDS_IN_A_DAY;

  return days;
}

export const getMedian = arr => {
  if (arr.length == 0) {
    return 0;
  } else if (arr.length == 1) {
    return arr[0];
  } else {
    const mid = Math.ceil(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid - 1] : (nums[mid - 1] + nums[mid]) / 2;
  }
};

const initializeStatusArray = (initialValue) => {
  return {
    [STATUS_DRAFT]: initialValue,
    [STATUS_REVIEW]: initialValue,
    [STATUS_SHIP]: initialValue,
    [STATUS_ACCEPTED]: initialValue,
    [STATUS_LIVE]: initialValue,
    [STATUS_COMPLETE]: initialValue
  }
}
