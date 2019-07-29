import { getStartDatepickerTimestamp, getEndDatepickerTimestamp } from '../dates/selectors';
import { getType } from '../type/selectors';
import { getStatus } from '../status/selectors'
import { getStartDatepickerTimestamp, getEndDatepickerTimestamp} from '../dates/selectors';
import { getStatus } from '../status/selectors';
import { STATUSES } from '../../constants';

const getExperiments = state =>
  state.getIn(["experiments", "items"]);

export const getExperimentsCount = state =>
  getExperiments(state).size;

export const getFilteredExperiments = (state) => {
  const experiments = getExperiments(state); 
  const selectedStartTimestamp = getStartDatepickerTimestamp(state);
  const selectedEndTimestamp = getEndDatepickerTimestamp(state);
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
    if (selectedStatusPriority && (selectedStatusPriority > experimentStatusPriority)) {
      return false;
    }

    return true;
  });
}
