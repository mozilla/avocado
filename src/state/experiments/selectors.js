export const getExperimentsCount = state =>
  state.get("experiments").get("items").size;

export const getFilteredExperimentsByDate = (state) => {
  let filteredExperiments = [];
  const experiments = state.get("experiments").get("items"); 
  const selectedStartTimestamp = getStartDatepickerTimestamp(state);
  const selectedEndTimestamp = getEndDatepickerTimestamp(state);

  for (let i = 0; i < experiments.size; i++) {
    const experimentStartDate = experiments.getIn([i, "start_date"])
    const experimentEndDate = experiments.getIn([i, "end_date"]);

    if (experimentStartDate >= selectedStartTimestamp && selectedEndTimestamp >= experimentEndDate) {
      filteredExperiments.push(experiments.getIn([i, "name"]))
    } 
  }
  return filteredExperiments;
}

const getStartDatepickerTimestamp = (state) => {
  const selectedStartDate = state.getIn(["dates", "startDate"]) || 0;
  return new Date(selectedStartDate).getTime();
}

const getEndDatepickerTimestamp = (state) => {
  const selectedEndDate = state.getIn(["dates", "endDate"]);
  return selectedEndDate ? new Date(selectedEndDate).getTime() : Number.MAX_SAFE_INTEGER;
}
