export const getExperimentsCount = state =>
  state.get("experiments").get("items").size;

export const getFilteredExperimentsByDate = (state) => {
  let validExperiments = [];
  const experiments = state.get("experiments").get("items"); 

  if (state.getIn(["dates", "startDate"])) {
    // these are the start and end dates 
    const selectedStartDate = state.getIn(["dates", "startDate"]);
    const selectedStartTimestamp = new Date(selectedStartDate).getTime();

    // loop through experiments and compare dates
    for (let i = 0; i < experiments.size; i++) {
      // check if end date exist
      const experimentStartDate = state.getIn(["experiments", "items", i, "start_date"])
      const experimentEndDate = state.getIn(["experiments", "items", i, "end_date"]);


      if (isEndDateSelected(state)) {  
        const selectedEndDate = state.getIn(["dates", "endDate"]);
        const selectedEndTimestamp = new Date(selectedEndDate).getTime();
        if (experimentStartDate >= selectedStartTimestamp && experimentEndDate <= selectedEndTimestamp) {
          validExperiments.push(state.getIn(["experiments", "items", i, "slug"]));
        }
      } else {
        if (experimentStartDate >= selectedStartTimestamp) {
          validExperiments.push(state.getIn(["experiments", "items", i, "slug"]));
        }
      }
    }
  }

  console.log("validExperiments: ", validExperiments);

  return validExperiments;
}

const isEndDateSelected = (state) => {
  if (state.getIn(["dates", "endDate"]) === "None selected" ) {
    return false;
  } 
  return true;
};
