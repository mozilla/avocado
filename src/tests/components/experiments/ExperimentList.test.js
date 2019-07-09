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
        filteredExperiments={[1,2,3]} 
      />
    );
    const text = wrapper.find("h1").text();
    expect(text).toEqual("3 / 113 experiments");
  });

  it("should call fetchExperiments()", () => {
    let fetchExperimentsCalled = false;
    shallow(
      <ExperimentList
        experimentCount={113}
        fetchExperiments={() => {
          fetchExperimentsCalled = true;
        }}
        filteredExperiments={[1,2,3]}
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
  it("should be passed both startDate and endDate as props", () => {
    const wrapper = shallow(
      <ExperimentList experimentCount={113} 
        fetchExperiments={() => {}} 
        filteredExperiments={[1,2,3]} 
        startDate={"2018-08-22"}
        endDate={"2019-01-20"}
      />
    );
    const text = wrapper.find("h1").text();
    expect(text).toEqual("3 / 113 experiments between 2018-08-22 and 2019-01-20");
  });

  it("should be passed only startDate as props", () => {
    const wrapper = shallow(
      <ExperimentList experimentCount={113} 
        fetchExperiments={() => {}} 
        filteredExperiments={[1,2,3]} 
        startDate={"2018-08-22"}
        endDate={""}
      />
    );
    const text = wrapper.find("h1").text();
    expect(text).toEqual("3 / 113 experiments after 2018-08-22");
  });

  it("should be passed only endDate as props", () => {
    const wrapper = shallow(
      <ExperimentList experimentCount={113} 
        fetchExperiments={() => {}} 
        filteredExperiments={[1,2,3]} 
        startDate={""}
        endDate={"2018-08-22"}
      />
    );
    const text = wrapper.find("h1").text();
    expect(text).toEqual("3 / 113 experiments before 2018-08-22");
  });
});