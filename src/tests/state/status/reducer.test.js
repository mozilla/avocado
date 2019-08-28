import { selectedStatus } from "/state/status/reducer";
import { STATUS_SELECTED } from "/state/action-types";
import { STATUS_DRAFT } from "/constants";

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
