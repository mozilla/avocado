import { getStartDatepickerTimestamp, getEndDatepickerTimestamp } from '../dates/selectors';
import { getType } from '../type/selectors';
import { getStatus } from '../status/selectors'

const getExperiments = state =>
  state.getIn(["experiments", "items"]);

export const getExperimentsCount = state =>
  getExperiments(state).size;

export const getFilteredExperiments = (state) => {
  const experiments = getExperiments(state); 
  const selectedStartTimestamp = getStartDatepickerTimestamp(state);
  const selectedEndTimestamp = getEndDatepickerTimestamp(state);
  const selectedType = getType(state);
  const status = getStatus(state);
  const mapStatusToInts = {"rejected": 0, "draft": 1, "review": 2, "ship": 3, "accepted": 4, "live": 5, "complete": 6};

  return experiments.filter(experiment => {
    const startDate = experiment.get("start_date");
    const endDate = experiment.get("end_date");
    const type = experiment.get("type");
    const experimentStatus = experiment.get("status");

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
    if (status) {
      if (mapStatusToInts[status.toLowerCase()] > mapStatusToInts[experimentStatus.toLowerCase()]) {
        return false;
      }
    }

    return true;
  });
}
