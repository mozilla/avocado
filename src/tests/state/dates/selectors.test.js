import { List, Map } from "immutable";
import { getStartDate } from "../../../state/dates/selectors";

describe("Date selectors", () => {
  it("should get start date", () => {
    let mockedState = Map({
        dates: Map({
          startDate: "2018-07-22"
        })
      });
    
    expect(getStartDate(mockedState)).toEqual("2018-07-22");
  });
});