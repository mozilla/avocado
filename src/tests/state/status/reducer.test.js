import { selectedStatus } from "../../../state/status/reducer";
import { STATUS_SELECTED } from "../../../state/action-types";

describe("Status Reducer", () => {
  it("should test default action for status selection", () => {
    let expectedState = null;
    expect(selectedStatus(undefined, {})).toEqual(expectedState);
  });

  it("should test draft selected case", () => {
    let expectedState = "draft";
    let reducerResult = selectedStatus(undefined, {
      type: STATUS_SELECTED,
      data: "draft"
    });
    expect(reducerResult).toEqual(expectedState);
  });
});
