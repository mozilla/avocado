import React from "react";
import { connect } from "react-redux";
import { ExperimentTable } from "./ExperimentTable";
import { fetchExperiments } from "../../state/experiments/actions";
import {
  getExperimentsCount,
  getFilteredExperiments
} from "../../state/experiments/selectors";
import { getStartDate, getEndDate } from "../../state/dates/selectors";
import PropTypes from "prop-types";
import { List } from "immutable";

export class ExperimentList extends React.Component {
  componentDidMount() {
    this.props.fetchExperiments();
  }

  renderTitle() {
    let title = "experiments";
    if (this.props.startDate) {
      title += ` after ${this.props.startDate}`;
    }
    if (this.props.endDate) {
      title += ` before ${this.props.endDate}`;
    }

    return title;
  }

  render() {
    return (
      <div>
        <div className="card bg-warning text-white shadow">
          <h2 className="card-body">
            {this.props.filteredExperiments.size} / {this.props.experimentCount}{" "}
            {this.renderTitle()}
          </h2>
        </div>
        <ExperimentTable {...this.props} />
      </div>
    );
  }
}

ExperimentList.propTypes = {
  experimentCount: PropTypes.number,
  fetchExperiments: PropTypes.func,
  filteredExperiments: PropTypes.instanceOf(List),
  startDate: PropTypes.string,
  endDate: PropTypes.string
};
const mapStateToProps = state => ({
  experimentCount: getExperimentsCount(state),
  filteredExperiments: getFilteredExperiments(state),
  startDate: getStartDate(state),
  endDate: getEndDate(state)
});

const mapDispatchToProps = dispatch => ({
  fetchExperiments: () => dispatch(fetchExperiments())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentList);
