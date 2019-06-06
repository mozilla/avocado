import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
configure({ adapter: new Adapter() });
import { ExperimentList } from "./App";


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
});


let x = 1;
let addOne = (arg) => arg + 1;