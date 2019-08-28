import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import { configure, mount } from "enzyme";
configure({ adapter: new Adapter() });
import { fromJS } from "immutable";
import ConnectedExperimentGraph, { ExperimentGraph } from "../../../components/experiments/ExperimentGraph";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";

describe("ExperimentGraph component", () => {
    it("should render an experiment graph component", () => {
        const container = mount(
            <ExperimentGraph />
        );
        expect(container.exists()).toBe(true);
    });

    it("should render an experiment graph component and check that it receives correct median array", () => {
        const medianVals = Array([1, 2, 3, 4, 5, 0]);

        const container = mount(
            <ExperimentGraph 
              median={medianVals}
            />
        );

        expect(container.props().median).toBe(medianVals);
    });

    it("should mount", () => {
        const experiment1 = {
            changes: [
              { changed_on: "2019-05-08T01:00:00.000000Z",
                new_status: "Draft", 
                old_status: null
              }
            ]
          }
          
        const experiment2 = {
            changes: [
                { changed_on: "2019-05-07T01:00:00.000000Z",
                    new_status: "Draft", 
                    old_status: null
                },
                { changed_on: "2019-05-08T01:00:00.000000Z",
                    new_status: "Review", 
                    old_status: "Draft"
                }
            ]
        };

        const mockStore = configureStore([thunk]);
        const store = mockStore(
            fromJS({
                experiments: {
                    items: [experiment1, experiment2]
                }
            })
        );
        mount(
            <Provider store={store}>
                <ConnectedExperimentGraph />
            </Provider>
        );
    });
});
