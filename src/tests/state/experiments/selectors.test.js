import { List, Map } from "immutable";
import { getExperimentsCount, getFilteredExperimentsByDate } from "../../../state/experiments/selectors";

describe("getExperimentsCount test", () => {
  it("should get experiment count", () => {
    let mockedState = Map({
      experiments: Map({
        items: List([1, 2, 3, 4])
      })
    });
    expect(getExperimentsCount(mockedState)).toEqual(4);
  });
});

describe("getFilteredExperimentsByDate tests", () => {
  it("should call getFilteredExperimentsByDate and return the first item in items", () => {
    let mockedState = Map({
      experiments: Map({
        items: List([
          Map({
            start_date: Date.parse("2018-08-22"),
            end_date: Date.parse("2019-01-20"),
            name: "test experiment name 1"
          }),
          Map({
            start_date: Date.parse("2017-08-22"),
            end_date: Date.parse("2019-01-20"),
            name: "test experiment name 2"
          })
        ])
      }), 
      dates: Map({
        startDate: "2018-07-22",
        endDate: "2019-07-22"
      })
    });
    expect(getFilteredExperimentsByDate(mockedState)).toEqual(
      List([
        Map({
          "start_date": Date.parse("2018-08-22"),
          "end_date": Date.parse("2019-01-20"),
          "name": "test experiment name 1"
        })
      ])
    );
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
    expect(getFilteredExperimentsByDate(mockedState)).toEqual(List([]));
  });

  it("should call getFilteredExperimentsByDate, case where only start datepicker is selected and item should be returned in filtered List", () => {
    let mockedState = Map({
      experiments: Map({
        items: List([
          Map({
            start_date: Date.parse("2018-08-22"),
            end_date: Date.parse("2019-08-22"),
            name: "test experiment name"
          })
        ])
      }), 
      dates: Map({
        startDate: "2018-07-22",
        endDate: ""
      })
    });
    expect(getFilteredExperimentsByDate(mockedState)).toEqual(
      List([
        Map({
          "start_date": Date.parse("2018-08-22"),
          "end_date": Date.parse("2019-08-22"),
          "name": "test experiment name"
        })
      ])
    );
  });

  it("should call getFilteredExperimentsByDate, case where only start datepicker is selected, and no filter results", () => {
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
        endDate: ""
      })
    });
    expect(getFilteredExperimentsByDate(mockedState)).toEqual(List([]));
  });
});
