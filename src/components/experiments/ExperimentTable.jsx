import React from "react";
import PropTypes from "prop-types";
import { List } from "immutable";

export class ExperimentTable extends React.Component {
  render() {
    const formatDate = dateString => {
      return new Date(dateString)
        .toUTCString()
        .replace(/\s*[0-9]{2}:[0-9]{2}:[0-9]{2} GMT$/i, "");
    };

    return (
      <div className="card shadow mb-4">
        <div className="card-body">
          <div
            id="dataTable_wrapper"
            className="dataTables_wrapper dt-bootstrap4 col-sm-12"
          >
            <table className="table table-bordered dataTable">
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
                      <td>
                        <a href={item.get("experiment_url")}>
                          {item.get("name")}
                        </a>
                      </td>
                      <td>{formatDate(item.get("start_date"))}</td>
                      <td>{formatDate(item.get("end_date"))}</td>
                      <td>{item.get("status")}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

ExperimentTable.propTypes = {
  filteredExperiments: PropTypes.instanceOf(List)
};
