import { startDate, endDate } from "avocado/state/dates/reducer";
import { START_DATE_SELECTED, END_DATE_SELECTED } from "avocado/state/action-types";

describe("Date Reducer", () => {
  it("should test default action for start date selection", () => {
    let expectedState = null;
    expect(startDate(undefined, {})).toEqual(expectedState);
  });

  it("should test start date selected case", () => {
    let expectedState = "2018-07-22";
    let reducerResult = startDate(undefined, {
      type: START_DATE_SELECTED,
      data: "2018-07-22"
    });
    expect(reducerResult).toEqual(expectedState);
  });

  it("should test default action for end date selection", () => {
    let expectedState = null;
    expect(endDate(undefined, {})).toEqual(expectedState);
  });
  
  it("should test end date selected case", () => {
    let expectedState = "2018-07-21";
    let reducerResult = endDate(undefined, {
      type: END_DATE_SELECTED,
      data: "2018-07-21"
    });
    expect(reducerResult).toEqual(expectedState);
  });
});
