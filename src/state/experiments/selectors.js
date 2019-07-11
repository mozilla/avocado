export const getExperimentsCount = state =>
  state.get("experiments").get("items").size;

export const getFilteredExperimentsByDate = (state) => {
  const experiments = state.get("experiments").get("items"); 
  const selectedStartTimestamp = getStartDatepickerTimestamp(state);
  const selectedEndTimestamp = getEndDatepickerTimestamp(state);

  const filteredExperiments = experiments.filter(experiment => {
    const startDate = experiment.get("start_date");
    const endDate = experiment.get("end_date");

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

    return true;
  });
  return filteredExperiments;
}

export const getStartDatepickerTimestamp = (state) => {
  const selectedStartDate = state.getIn(["dates", "startDate"]);
  return selectedStartDate ? new Date(selectedStartDate).getTime() : null;
}

export const getEndDatepickerTimestamp = (state) => {
  const selectedEndDate = state.getIn(["dates", "endDate"]);
  return selectedEndDate ? new Date(selectedEndDate).getTime() : null;
}
