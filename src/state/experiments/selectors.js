import { getStartDatepickerTimestamp, getEndDatepickerTimestamp} from '../dates/selectors';
import { getType } from '../type/selectors'
import { getStatus } from '../status/selectors';
import { STATUSES } from '../../constants';
import { STATUS_REJECTED, STATUS_DRAFT, STATUS_REVIEW, STATUS_SHIP, STATUS_ACCEPTED, STATUS_LIVE, STATUS_COMPLETE } from '../../constants';

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
 * Return an object with objects that state as the key, and how many days it spent in each state as the value.
 * @param {} state 
 */
export const getStatusDates = (state) => {
  const experiments = getFilteredExperiments(state);

  return experiments.map(experiment => {
    let statuses = {
      [STATUS_REJECTED]: 0,
      [STATUS_DRAFT]: 0,
      [STATUS_REVIEW]: 0,
      [STATUS_SHIP]: 0,
      [STATUS_ACCEPTED]: 0,
      [STATUS_LIVE]: 0,
      [STATUS_COMPLETE]: 0
    }

    const changes = experiment.getIn(["changes"]);
    let oldDate = null;
    let oldStatus = null;

    changes.forEach((changelog) => {
      const changedDate = changelog.get("changed_on");
      const newStatus = changelog.get("new_status");
  
      if (oldDate && oldStatus) {
        statuses[oldStatus] += getNumberDaysBetweenDates(oldDate, changedDate)
      }

      oldDate = changedDate;
      oldStatus = newStatus;
    });

    console.log("statuses: ", statuses);
    return statuses;
  })
}

const getNumberDaysBetweenDates = (oldDate, newDate) => {
  const date1 = new Date(oldDate);
  const date2 = new Date(newDate);

  const res = Math.abs(date1 - date2) / 1000;
  const days = Math.floor(res / 86400);

  return days;
}
