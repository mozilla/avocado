import React from "react";
import PropTypes from "prop-types";
import { List } from "immutable";

export class ExperimentTable extends React.Component {
  render() {
    const formatDate = dateString => {
      return new Date(dateString)
        .toUTCString()
        .replace(/\s*[0-9]{2}:[0-9]{2}:[0-9]{2} GMT$/i, "");
    }

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
                <td>
                  {formatDate(item.get("start_date"))}
                </td>
                <td>
                  {formatDate(item.get("end_date"))}
                </td>
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
