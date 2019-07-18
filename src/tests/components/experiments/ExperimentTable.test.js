import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
configure({ adapter: new Adapter() });
import { fromJS } from "immutable";
import { ExperimentTable } from "../../../components/experiments/ExperimentTable";

describe("ExperimentTable component", () => {
    const container = shallow(
        <ExperimentTable 
          filteredExperiments={fromJS([{name: "Name", start_date: "2018-08-22", end_date: "2018-08-23", status: "live"}])}
        />
      );
    const thead = container.find('thead');
    const headerRow = thead.find('tr');
    const tbody = container.find('tbody');
    const rows = tbody.find('tr');

    it("should render an experiment table with one thead tag", () => {
        expect(thead).toHaveLength(1);
    });
    
    it("should render an experiment table with correct header rows defining the head of the columns of the table", () => {
        headerRow.forEach((tr) => {
            const cells = tr.find('th');
            expect(cells).toHaveLength(4);
            expect(cells.at(0).text()).toEqual("Name");
            expect(cells.at(1).text()).toEqual("Start Date");
            expect(cells.at(2).text()).toEqual("End Date");
            expect(cells.at(3).text()).toEqual("Status");
        });
    });

    it("should render an experiment table with one tbody tag", () => {
        expect(tbody).toHaveLength(1);
    });

    it("should render an experiment table with one row", () => {
        expect(rows).toHaveLength(1);
    });

    it("should render experiment table rows with column info of: name, start_date, end_date, status", () => {
        rows.forEach((tr) => {
            const cells = tr.find('td');
            expect(cells).toHaveLength(4);
            expect(cells.at(0).text()).toEqual("Name");
            expect(cells.at(1).text()).toEqual("Wed, 22 Aug 2018 00:00:00 GMT");
            expect(cells.at(2).text()).toEqual("Thu, 23 Aug 2018 00:00:00 GMT");
            expect(cells.at(3).text()).toEqual("live");
        });
    });
});
