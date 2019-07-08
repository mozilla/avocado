import { List, Map } from "immutable";
import { getExperimentsCount, getFilteredExperimentsByDate } from "../../../state/experiments/selectors";

describe("Selectors", () => {
  it("should get experiment count", () => {
    let mockedState = Map({
      experiments: Map({
        items: List([1, 2, 3, 4])
      })
    });
    expect(getExperimentsCount(mockedState)).toEqual(4);
  });
});

describe("getFilteredExperimentsByDate", () => {
  it("should call getFilteredExperimentsByDate, case where both start and end datepickers have dates selected", () => {
    let mockedState = Map({
      experiments: Map({
        items: List([
          Map({
            start_date: Date.parse("2018-08-22"),
            end_date: Date.parse("2019-01-20")
          })
        ])
      }), 
      dates: Map({
        startDate: "2018-07-22",
        endDate: "2019-07-22"
      })
    });
    expect(getFilteredExperimentsByDate(mockedState).length).toEqual(1);
  });

  it("should call getFilteredExperimentsByDate, case where only start datepicker is selected", () => {
    let mockedState = Map({
      experiments: Map({
        items: List([
          Map({
            start_date: Date.parse("2018-08-22"),
            end_date: Date.parse("2019-08-22"),
            name: "only startDatepicker"
          })
        ])
      }), 
      dates: Map({
        startDate: "2018-07-22",
        endDate: "None selected"
      })
    });
    expect(getFilteredExperimentsByDate(mockedState)).toEqual(["only startDatepicker"]);
  });

  it("should call getFilteredExperimentsByDate, case where experiments don't pass filter", () => {
    let mockedState = Map({
      experiments: Map({
        items: List([
          Map({
            start_date: Date.parse("2017-08-22"),
            end_date: Date.parse("2019-01-20")
          })
        ])
      }), 
      dates: Map({
        startDate: "2018-07-22",
        endDate: "2019-07-22"
      })
    });
    expect(getFilteredExperimentsByDate(mockedState).length).toEqual(0);
  });

  it("should call getFilteredExperimentsByDate, case where start datepicker set, and no filter results", () => {
    let mockedState = Map({
      experiments: Map({
        items: List([
          Map({
            start_date: Date.parse("2017-08-22"),
            end_date: Date.parse("2019-01-20")
          })
        ])
      }), 
      dates: Map({
        startDate: "2018-07-22",
        endDate: "None selected"
      })
    });
    expect(getFilteredExperimentsByDate(mockedState)).toEqual([]);
  });
});
