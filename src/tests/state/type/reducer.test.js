import { selectedType } from "avocado/state/type/reducer";
import { TYPE_SELECTED } from "avocado/state/action-types";

describe("Type Reducer", () => {
  it("should test default action for type selection", () => {
    let expectedState = [];
    expect(selectedType(undefined, {})).toEqual(expectedState);
  });

  it("should test addon selected case", () => {
    let expectedState = "addon";
    let reducerResult = selectedType(undefined, {
      type: TYPE_SELECTED,
      data: "addon",
    });
    expect(reducerResult).toEqual(expectedState);
  });

  it("should test pref selected case", () => {
    let expectedState = "pref";
    let reducerResult = selectedType(undefined, {
      type: TYPE_SELECTED,
      data: "pref",
    });
    expect(reducerResult).toEqual(expectedState);
  });
});
