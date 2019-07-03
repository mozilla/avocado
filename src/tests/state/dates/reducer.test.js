import date from "../../../state/dates/reducer";
import { fromJS } from "immutable";
import { START_DATE_SELECTED, END_DATE_SELECTED } from "../../../state/action-types";

describe("Date Reducer", () => {
  it("should test default action for start date selection", () => {
    let expectedState = fromJS({ dates: "None selected" });
    expect(date(undefined, {})).toEqual(expectedState);
  });

  it("should test start date selected case", () => {
    let expectedState = fromJS({"dates": "2018-07-22"});
    let reducerResult = date(undefined, {
      type: START_DATE_SELECTED,
      data: "2018-07-22"
    });
    expect(reducerResult).toEqual(expectedState);
  });
  
  it("should test end date selected case", () => {
    let expectedState = fromJS({"dates": "2018-07-21"});
    let reducerResult = date(undefined, {
      type: END_DATE_SELECTED,
      data: "2018-07-21"
    });
    expect(reducerResult).toEqual(expectedState);
  });
});
