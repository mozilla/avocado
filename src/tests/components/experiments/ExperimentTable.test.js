import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
configure({ adapter: new Adapter() });
import { fromJS } from "immutable";
import { ExperimentTable } from "/components/experiments/ExperimentTable";

describe("ExperimentTable component", () => {
    it("should render an experiment table with a header row defining the head of the columns, as well as table rows that display correct column information", () => {
        const container = shallow(
            <ExperimentTable 
              filteredExperiments={fromJS([{name: "Name", start_date: "2018-08-22", end_date: "2018-08-23", status: "live"}])}
            />
        );

        const thead = container.find('thead');
        expect(thead).toHaveLength(1);

        // check that header row has correct column titles
        const headerRow = thead.find('tr');
        headerRow.forEach((tr) => {
            const cells = tr.find('th');
            expect(cells).toHaveLength(4);
            expect(cells.at(0).text()).toEqual("Name");
            expect(cells.at(1).text()).toEqual("Start Date");
            expect(cells.at(2).text()).toEqual("End Date");
            expect(cells.at(3).text()).toEqual("Status");
        });

        const tbody = container.find('tbody');
        expect(tbody).toHaveLength(1);

        const rows = tbody.find('tr');
        expect(rows).toHaveLength(1);

        // check that each value displayed in row is correct
        rows.forEach((tr) => {
            const cells = tr.find('td');
            expect(cells).toHaveLength(4);
            expect(cells.at(0).text()).toEqual("Name");
            expect(cells.at(1).text()).toEqual("Wed, 22 Aug 2018");
            expect(cells.at(2).text()).toEqual("Thu, 23 Aug 2018");
            expect(cells.at(3).text()).toEqual("live");
        });
    });
});
