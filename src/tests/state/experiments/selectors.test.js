import { fromJS } from "immutable";
import { getExperimentsCount, getFilteredExperimentsByDate, 
  getStartDatepickerTimestamp, getEndDatepickerTimestamp 
} from "../../../state/experiments/selectors";

describe("getExperimentsCount test", () => {
  it("should get experiment count", () => {
    let mockedState = fromJS({
      experiments: fromJS({
        items: fromJS([1, 2, 3, 4])
      })
    });
    expect(getExperimentsCount(mockedState)).toEqual(4);
  });
});

describe("getFilteredExperimentsByDate tests", () => {
  it("should return an immutable List of filtered experiments, where 1 experiment falls between startDate and endDate range", () => {
    let mockedState = fromJS({
      experiments: fromJS({
        items: fromJS([
          fromJS({
            start_date: Date.parse("2018-08-22"),
            end_date: Date.parse("2019-01-20"),
            name: "test experiment name 1"
          }),
          fromJS({
            start_date: Date.parse("2017-08-22"),
            end_date: Date.parse("2019-01-20"),
            name: "test experiment name 2"
          })
        ])
      }), 
      dates: fromJS({
        startDate: "2018-07-22",
        endDate: "2019-07-22"
      })
    });
    expect(getFilteredExperimentsByDate(mockedState)).toEqual(
      fromJS([
        fromJS({
          "start_date": Date.parse("2018-08-22"),
          "end_date": Date.parse("2019-01-20"),
          "name": "test experiment name 1"
        })
      ])
    );
  });

  it("should return an empty List, where none of the items in experiments fall between the startDate and endDate ranges", () => {
    let mockedState = fromJS({
      experiments: fromJS({
        items: fromJS([
          fromJS({
            start_date: Date.parse("2017-08-22"),
            end_date: Date.parse("2019-01-20")
          })
        ])
      }), 
      dates: fromJS({
        startDate: "2018-07-22",
        endDate: "2019-07-22"
      })
    });
    expect(getFilteredExperimentsByDate(mockedState)).toEqual(fromJS([]));
  });

  it("should return all experiments with start date after startDate", () => {
    let mockedState = fromJS({
      experiments: fromJS({
        items: fromJS([
          fromJS({
            start_date: Date.parse("2018-08-22"),
            end_date: Date.parse("2019-08-22"),
            name: "test experiment name"
          })
        ])
      }), 
      dates: fromJS({
        startDate: "2018-07-22",
        endDate: ""
      })
    });
    expect(getFilteredExperimentsByDate(mockedState)).toEqual(
      fromJS([
        fromJS({
          "start_date": Date.parse("2018-08-22"),
          "end_date": Date.parse("2019-08-22"),
          "name": "test experiment name"
        })
      ])
    );
  });

  it("should return an empty List because all experiment start dates are before chosen startDates", () => {
    let mockedState = fromJS({
      experiments: fromJS({
        items: fromJS([
          fromJS({
            start_date: Date.parse("2017-08-22"),
            end_date: Date.parse("2019-01-20")
          })
        ])
      }), 
      dates: fromJS({
        startDate: "2018-07-22",
        endDate: ""
      })
    });
    expect(getFilteredExperimentsByDate(mockedState)).toEqual(fromJS([]));
  });

  it("should return empty List because experiment start date is null", () => {
    let mockedState = fromJS({
      experiments: fromJS({
        items: fromJS([
          fromJS({
            start_date: null,
            end_date: Date.parse("2019-01-20")
          })
        ])
      }), 
      dates: fromJS({
        startDate: "2018-07-22",
        endDate: ""
      })
    });
    expect(getFilteredExperimentsByDate(mockedState)).toEqual(fromJS([]));
  });

  it("should return an empty List because all experiment end dates are after chosen endDates", () => {
    let mockedState = fromJS({
      experiments: fromJS({
        items: fromJS([
          fromJS({
            start_date: Date.parse("2017-08-22"),
            end_date: Date.parse("2019-01-20")
          })
        ])
      }), 
      dates: fromJS({
        startDate: "",
        endDate: "2016-07-22"
      })
    });
    expect(getFilteredExperimentsByDate(mockedState)).toEqual(fromJS([]));
  });

  it("should return empty List because experiment end date is null", () => {
    let mockedState = fromJS({
      experiments: fromJS({
        items: fromJS([
          fromJS({
            start_date: Date.parse("2019-01-20"),
            end_date: null
          })
        ])
      }), 
      dates: fromJS({
        startDate: "",
        endDate: "2018-07-22"
      })
    });
    expect(getFilteredExperimentsByDate(mockedState)).toEqual(fromJS([]));
  });
});

describe("timestamp helper functions (getStartDatepickerTimestamp, getEndDatepickerTimestamp) tests", () => {
  it("should return the startDate timestamp when startDate is not null", () => {
    let mockedState = fromJS({
      dates: fromJS({
        startDate: "2018-07-22"
      })
    });
    expect(getStartDatepickerTimestamp(mockedState)).toEqual(1532217600000);
  });

  it("should return null when startDate is empty string", () => {
    let mockedState = fromJS({
      dates: fromJS({
        startDate: ""
      })
    });
    expect(getStartDatepickerTimestamp(mockedState)).toEqual(null);
  });

  it("should return the endDate timestamp when endDate is not null", () => {
    let mockedState = fromJS({
      dates: fromJS({
        endDate: "2018-07-22"
      })
    });
    expect(getEndDatepickerTimestamp(mockedState)).toEqual(1532217600000);
  });

  it("should return null when endDate is empty string", () => {
    let mockedState = fromJS({
      dates: fromJS({
        endDate: ""
      })
    });
    expect(getEndDatepickerTimestamp(mockedState)).toEqual(null);
  });
});
