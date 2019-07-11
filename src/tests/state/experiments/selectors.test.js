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
  it("should return an immutable List of filtered experiments, where 1 experiment falls between startDate and endDate range", () => {
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

  it("should return an empty List, where none of the items in experiments fall between the startDate and endDate ranges", () => {
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

  it("should return all experiments with start date after startDate", () => {
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

  it("should return an empty List because all experiment start dates are before chosen startDates", () => {
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

  it("should return empty List because experiment start date is null", () => {
    let mockedState = Map({
      experiments: Map({
        items: List([
          Map({
            start_date: null,
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

  it("should return an empty List because all experiment end dates are after chosen endDates", () => {
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
        startDate: "",
        endDate: "2016-07-22"
      })
    });
    expect(getFilteredExperimentsByDate(mockedState)).toEqual(List([]));
  });

  it("should return empty List because experiment end date is null", () => {
    let mockedState = Map({
      experiments: Map({
        items: List([
          Map({
            start_date: Date.parse("2019-01-20"),
            end_date: null
          })
        ])
      }), 
      dates: Map({
        startDate: "",
        endDate: "2018-07-22"
      })
    });
    expect(getFilteredExperimentsByDate(mockedState)).toEqual(List([]));
  });
});
