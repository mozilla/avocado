import { selectedStatus } from "avocado/state/status/reducer";
import { STATUS_SELECTED } from "avocado/state/action-types";
import { STATUS_DRAFT } from "avocado/constants";

describe("Status Reducer", () => {
  it("should test default action for status selection", () => {
    let expectedState = null;
    expect(selectedStatus(undefined, {})).toEqual(expectedState);
  });

  it("should test draft selected case", () => {
    let expectedState = STATUS_DRAFT;
    let reducerResult = selectedStatus(undefined, {
      type: STATUS_SELECTED,
      data: STATUS_DRAFT
    });
    expect(reducerResult).toEqual(expectedState);
  });

  it("should return null state when empty string from selecting case `All`", () => {
    let expectedState = null;
    let reducerResult = selectedStatus(undefined, {
      type: STATUS_SELECTED,
      data: ""
    });
    expect(reducerResult).toEqual(expectedState);
  });
});
