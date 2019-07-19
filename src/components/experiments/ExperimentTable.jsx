import React from "react";
import PropTypes from "prop-types";
import { List } from "immutable";

export class ExperimentTable extends React.Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {this.props.filteredExperiments.map(function(item, key) {
            return (
              <tr key={key}>
                <td>{item.get("name")}</td>
                <td>{new Date(item.get("start_date")).toGMTString()}</td>
                <td>{new Date(item.get("end_date")).toGMTString()}</td>
                <td>{item.get("status")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

ExperimentTable.propTypes = {
  filteredExperiments: PropTypes.instanceOf(List)
};
