import { fromJS } from "immutable";
import { getExperimentsCount, getFilteredExperiments, getMedian, getNumberDaysBetweenDates } from "../../../state/experiments/selectors";
import { STATUS_DRAFT, STATUS_LIVE } from "../../../constants";

describe("getExperimentsCount test", () => {
  it("should get experiment count", () => {
    let mockedState = fromJS({
      experiments: {
        items: [1, 2, 3, 4]
      }
    });
    expect(getExperimentsCount(mockedState)).toEqual(4);
  });
});

describe("getFilteredExperiments tests", () => {
  const experiment1 = {
    start_date: Date.parse("2018-08-22"),
    end_date: Date.parse("2019-01-20"),
    name: "test experiment name 1",
    type: "pref",
    status: STATUS_DRAFT
  };

  const experiment2 = {
    start_date: Date.parse("2017-08-22"),
    end_date: Date.parse("2019-01-20"),
    name: "test experiment name 2",
    type: "addon",
    status: STATUS_LIVE
  }

  const mockedExperiments = {
    items: [
      experiment1,
      experiment2
    ]
  }
  
  it("should return an immutable List of filtered experiments, where 1 experiment falls between startDate and endDate range", () => {
    const mockedState = fromJS({
      experiments: mockedExperiments, 
      dates: {
        startDate: "2018-07-22",
        endDate: "2019-07-22"
      }
    });

    expect(getFilteredExperiments(mockedState)).toEqual(fromJS([experiment1]));
  });

  it("should return an empty List, where none of the items in experiments fall between the startDate and endDate ranges", () => {
    const mockedState = fromJS({
      experiments: mockedExperiments, 
      dates: {
        startDate: "2019-12-01",
        endDate: "2019-12-31"
      }
    });
    expect(getFilteredExperiments(mockedState)).toEqual(fromJS([]));
  });

  it("should return all experiments with start date after startDate", () => {
    const mockedState = fromJS({
      experiments: mockedExperiments, 
      dates: {
        startDate: "2018-08-01",
        endDate: null
      }
    });
    expect(getFilteredExperiments(mockedState)).toEqual(fromJS([experiment1]));
  });

  it("should return an empty List because all experiment start dates are before chosen startDates", () => {
    const mockedState = fromJS({
      experiments: mockedExperiments, 
      dates: {
        startDate: "2018-08-23",
        endDate: null
      }
    });
    expect(getFilteredExperiments(mockedState)).toEqual(fromJS([]));
  });

  it("should return empty List because experiment start date is null", () => {
    const mockedState = fromJS({
      experiments: {
        items: [
          {
            start_date: null,
            end_date: Date.parse("2019-01-20")
          }
        ]
      }, 
      dates: {
        startDate: "2018-07-22"
      }
    });
    expect(getFilteredExperiments(mockedState)).toEqual(fromJS([]));
  });

  it("should return an empty List because all experiment end dates are after chosen endDates", () => {
    const mockedState = fromJS({
      experiments: mockedExperiments, 
      dates: {
        startDate: null,
        endDate: "2016-07-22"
      }
    });
    expect(getFilteredExperiments(mockedState)).toEqual(fromJS([]));
  });

  it("should return empty List because experiment end date is null", () => {
    const mockedState = fromJS({
      experiments: {
        items: [
          {
            start_date: Date.parse("2019-01-20"),
            end_date: null
          }
        ]
      }, 
      dates: {
        endDate: "2018-07-22"
      }
    });
    expect(getFilteredExperiments(mockedState)).toEqual(fromJS([]));
  });

  it("should return experiment that has type `pref`", () => {
    const mockedState = fromJS({
      experiments: mockedExperiments, 
      type: {
        selectedType: "pref"
      }
    });

    expect(getFilteredExperiments(mockedState)).toEqual(fromJS([experiment1]));
  });

  it("should return experiment that has type `addon`", () => {
    const mockedState = fromJS({
      experiments: mockedExperiments, 
      type: {
        selectedType: "addon"
      }
    });

    expect(getFilteredExperiments(mockedState)).toEqual(fromJS([experiment2]));
  });

  it("should return experiments of all types", () => {
    const mockedState = fromJS({
      experiments: mockedExperiments, 
      type: {
        selectedType: null
      }
    });

    expect(getFilteredExperiments(mockedState)).toEqual(fromJS([experiment1, experiment2]));
  });

  it("should filter status, and return experiments that have reached at least draft", () => {
    let mockedState = fromJS({
      experiments: mockedExperiments,
      status: {
        selectedStatus: STATUS_DRAFT
      }
    });
    expect(getFilteredExperiments(mockedState)).toEqual(fromJS([experiment1, experiment2]));
  });

  it("should filter status, and return experiments that have reached at least live", () => {
    let mockedState = fromJS({
      experiments: mockedExperiments,
      status: {
        selectedStatus: STATUS_LIVE
      }
    });
    expect(getFilteredExperiments(mockedState)).toEqual(fromJS([experiment2]));
  });

  it("should have filter status set to `All`, and return all experiments", () => {
    let mockedState = fromJS({
      experiments: mockedExperiments,
      status: {
        selectedStatus: null
      }
    });
    expect(getFilteredExperiments(mockedState)).toEqual(fromJS([experiment1, experiment2]));
  });
});

describe("Median Array helper functions", () => {
  it("should call getMedian() on an array with odd number of elements that are unsorted", () => {
    expect(getMedian([10, 2, 4, 1, 8])).toEqual(4);
  });

  it("should call getMedian() on an array with even number of elements that are unsorted", () => {
    expect(getMedian([10, 8, 1, 7])).toEqual(7.5);
  });

  it("should call getMedian() on an empty array", () => {
    expect(getMedian([])).toEqual(0);
  });

  it("should call getMedian() on an array with one element", () => {
    expect(getMedian([1])).toEqual(1);
  });

  // getNumberDaysBetweenDates
  it("should call getNumberDaysBetweenDates() ", () => {
    const date1 = "2019-03-20T19:40:24.413929Z";
    const date2 = "2019-03-25T19:40:24.413929Z"
    
    expect(getNumberDaysBetweenDates(date2, date1)).toEqual(5);
  });

  it("should call getNumberDaysBetweenDates() where 0 number of days are between them", () => {
    const date1 = "2019-03-20T01:00:00.000000Z";
    const date2 = "2019-03-20T13:00:00.000000Z";
    
    expect(getNumberDaysBetweenDates(date2, date1)).toEqual(0.50);
  });


});
