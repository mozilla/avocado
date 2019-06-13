export const getExperimentsCount = state =>
  state.get("experiments").get("items").size;
