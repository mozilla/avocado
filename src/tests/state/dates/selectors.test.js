import { fromJS } from "immutable";
import { getStartDate, getEndDate,
  getStartDatepickerTimestamp, getEndDatepickerTimestamp 
} from "../../../state/dates/selectors";

describe("Date selectors", () => {
  it("should get start date", () => {
    let mockedState = fromJS({
        dates: {
          startDate: "2018-07-22"
        }
      });
    
    expect(getStartDate(mockedState)).toEqual("2018-07-22");
  });

  it("should get end date", () => {
    let mockedState = fromJS({
        dates: {
          endDate: "2018-07-22"
        }
      });
    
    expect(getEndDate(mockedState)).toEqual("2018-07-22");
  });
});

describe("timestamp helper functions (getStartDatepickerTimestamp, getEndDatepickerTimestamp) tests", () => {
  it("should return the startDate timestamp when startDate is not null", () => {
    const mockedState = fromJS({
      dates: {
        startDate: "2018-07-22"
      }
    });
    expect(getStartDatepickerTimestamp(mockedState)).toEqual(1532217600000);
  });

  it("should return null when startDate is null", () => {
    const mockedState = fromJS({
      dates: {
        startDate: null
      }
    });
    expect(getStartDatepickerTimestamp(mockedState)).toEqual(null);
  });

  it("should return the endDate timestamp when endDate is not null", () => {
    const mockedState = fromJS({
      dates: {
        endDate: "2018-07-22"
      }
    });
    expect(getEndDatepickerTimestamp(mockedState)).toEqual(1532217600000);
  });

  it("should return null when endDate is null", () => {
    const mockedState = fromJS({
      dates: {
        endDate: null
      }
    });
    expect(getEndDatepickerTimestamp(mockedState)).toEqual(null);
  });
});
