import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { shallow, mount, configure } from "enzyme";
configure({ adapter: new Adapter() });
import ConnectedExperimentList, { ExperimentList } from "./App";
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { List, Map } from 'immutable';
import thunk from "redux-thunk";


// create fake store and action


describe("Experiment list component", () => {
  it("should render the experiment count", () => { 
    const wrapper = shallow(<ExperimentList experimentCount={113} fetchExperiments={()=>{}}/>);
    const text = wrapper.find("h1").text();
    expect(text).toEqual("113 experiments");
  });

  it("should call fetchExperiments()", () => { 
    let fetchExperimentsCalled = false;
    const wrapper = shallow(<ExperimentList experimentCount={113} fetchExperiments={()=>{ fetchExperimentsCalled = true; }}/>);
    expect(fetchExperimentsCalled).toBeTruthy();
  });

  it("should mount", () => { 
    const mockStore = configureStore([thunk]);
    const store = mockStore(
      Map({ 
        experiments: Map({ 
          items: List([]) 
        })
      })
    );
    const connectedComponent = mount(
      <Provider store={store}>
        <ConnectedExperimentList />
      </Provider>
    )

  });


});
