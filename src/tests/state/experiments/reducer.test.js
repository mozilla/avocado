import experiments from "../../../state/experiments/reducer";
import { fromJS } from "immutable";
import { EXPERIMENT_DATA_RECEIVED } from "../../../state/action-types";

describe("Reducer", () => {
  it("should test default action", () => {
    let expectedState = fromJS({ items: [] });
    expect(experiments(undefined, {})).toEqual(expectedState);
  });

  it("should test EXPERIMENT_DATA_RECEIVED case", () => {
    let expectedState = fromJS({ items: "[1,2,3]" });
    let reducerResult = experiments(undefined, {
      type: EXPERIMENT_DATA_RECEIVED,
      data: "[1,2,3]"
    });
    expect(reducerResult).toEqual(expectedState);
  });
});
