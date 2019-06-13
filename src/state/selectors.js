export const getExperimentsCount = state =>
  state.get("experiments").get("items").size;

export const getStartDate = state =>
  state.get("startDate").get("dates");
