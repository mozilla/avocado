import { List, Map } from "immutable";
import { getStartDate, getEndDate } from "../../../state/dates/selectors";

describe("Date selectors", () => {
  it("should get start date", () => {
    let mockedState = Map({
        dates: Map({
          startDate: "2018-07-22"
        })
      });
    
    expect(getStartDate(mockedState)).toEqual("2018-07-22");
  });

  it("should get end date", () => {
    let mockedState = Map({
        dates: Map({
          endDate: "2018-07-22"
        })
      });
    
    expect(getEndDate(mockedState)).toEqual("2018-07-22");
  });
});