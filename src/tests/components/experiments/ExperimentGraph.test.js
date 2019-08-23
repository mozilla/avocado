import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, mount, render } from "enzyme";
configure({ adapter: new Adapter() });
import { fromJS } from "immutable";
import { ExperimentGraph } from "../../../components/experiments/ExperimentGraph";

describe("ExperimentGraph component", () => {
    it("should render an experiment graph component", () => {
        const container = shallow(
            <ExperimentGraph 
              median={ fromJS([1, 2, 3, 4, 5, 0]) }
            />
        );

        expect(container.exists()).toBe(true);
    });

    it("should render an experiment graph component", () => {
        const medianVals = fromJS([1, 2, 3, 4, 5, 0]);

        const container = mount(
            <ExperimentGraph 
              median={medianVals}
            />
        );

        expect(container.props().median).toBe(medianVals);
    });
});
