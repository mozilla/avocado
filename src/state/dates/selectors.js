export const getStartDate = state =>
  state.get("dates").get("startDate");

export const getEndDate = state =>
  state.get("dates").get("endDate");

export const getStartDatepickerTimestamp = (state) => {
  const selectedStartDate = state.getIn(["dates", "startDate"]);
  return selectedStartDate ? new Date(selectedStartDate).getTime() : null;
}

export const getEndDatepickerTimestamp = (state) => {
  const selectedEndDate = state.getIn(["dates", "endDate"]);
  return selectedEndDate ? new Date(selectedEndDate).getTime() : null;
}
