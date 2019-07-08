export const getExperimentsCount = state =>
  state.get("experiments").get("items").size;

export const getFilteredExperimentsByDate = (state) => {
  let validExperiments = [];
  const experiments = state.get("experiments").get("items"); 
  const selectedStartTimestamp = getStartDatepickerTimestamp(state);

  for (let i = 0; i < experiments.size; i++) {
    const experimentStartDate = experiments.getIn([i, "start_date"])
    const experimentEndDate = experiments.getIn([i, "end_date"]);

    if (isEndDateSelected(state)) {  
      const selectedEndTimestamp = getEndDatepickerTimestamp(state);
      if (experimentStartDate >= selectedStartTimestamp && experimentEndDate <= selectedEndTimestamp) {
        validExperiments.push(experiments.getIn([i, "name"]));
      }
    } else {
      if (experimentStartDate >= selectedStartTimestamp) {
        validExperiments.push(experiments.getIn([i, "name"]));
      }
    }  
  }
  return validExperiments;
}

const getStartDatepickerTimestamp = (state) => {
  const selectedStartDate = state.getIn(["dates", "startDate"]);
  return new Date(selectedStartDate).getTime();
}

const getEndDatepickerTimestamp = (state) => {
  const selectedEndDate = state.getIn(["dates", "endDate"]);
  return new Date(selectedEndDate).getTime();
}

const isEndDateSelected = (state) => {
  if (state.getIn(["dates", "endDate"]) === "None selected" ) {
    return false;
  } 
  return true;
};