import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, mount, configure } from "enzyme";
configure({ adapter: new Adapter() });
import ConnectedExperimentList, {
  ExperimentList
} from "../../../components/experiments/ExperimentList";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { List, Map } from "immutable";
import thunk from "redux-thunk";

describe("Experiment list component", () => {
  it("should render the experiment count", () => {
    const wrapper = shallow(
      <ExperimentList experimentCount={113} 
        fetchExperiments={() => {}} 
        filteredExperiments={List([Map({start_date: "some date"})])}
      />
    );
    const text = wrapper.find("h1").text();
    expect(text).toEqual("1 / 113 experiments");
  });

  it("should call fetchExperiments()", () => {
    let fetchExperimentsCalled = false;
    shallow(
      <ExperimentList
        experimentCount={113}
        fetchExperiments={() => {
          fetchExperimentsCalled = true;
        }}
        filteredExperiments={List([Map({start_date: "some date"})])}
      />
    );
    expect(fetchExperimentsCalled).toBeTruthy();
  });

  it("should mount", () => {
    const mockStore = configureStore([thunk]);
    const store = mockStore(
      Map({
        experiments: Map({
          items: List([])
        }),
        dates: Map({
          start_date: Date.parse("2018-08-22"),
          end_date: Date.parse("2019-01-20"),
        })
      })
    );
    mount(
      <Provider store={store}>
        <ConnectedExperimentList />
      </Provider>
    );
  });
});

describe("Test renderTitle() method", () => {
  it("should render a title showing 1 experiment filtered, and the date range that it falls between", () => {
    const wrapper = shallow(
      <ExperimentList experimentCount={113} 
        fetchExperiments={() => {}} 
        filteredExperiments={List([Map({})])}
        startDate={"2018-08-22"}
        endDate={"2019-01-20"}
      />
    );
    const text = wrapper.find("h1").text();
    expect(text).toEqual("1 / 113 experiments after 2018-08-22 before 2019-01-20");
  });

  it("should render a title showing number of experiments filtered after startDate out of total number of experiments, and startDate", () => {
    const wrapper = shallow(
      <ExperimentList experimentCount={113} 
        fetchExperiments={() => {}} 
        filteredExperiments={List([Map({})])}
        startDate={"2018-08-22"}
        endDate={""}
      />
    );
    const text = wrapper.find("h1").text();
    expect(text).toEqual("1 / 113 experiments after 2018-08-22");
  });

  it("should render a title showing number of experiments that happen before endDate out of total number of experiments, and endDate", () => {
    const wrapper = shallow(
      <ExperimentList experimentCount={113} 
        fetchExperiments={() => {}} 
        filteredExperiments={List([Map({})])}
        startDate={""}
        endDate={"2018-08-22"}
      />
    );
    const text = wrapper.find("h1").text();
    expect(text).toEqual("1 / 113 experiments before 2018-08-22");
  });
});