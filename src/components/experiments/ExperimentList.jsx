import React from "react";
import { connect } from "react-redux";
import { fetchExperiments } from "../../state/experiments/actions";
import {
  getExperimentsCount,
  getFilteredExperimentsByDate
} from "../../state/experiments/selectors";
import {
  getStartDate
} from "../../state/dates/selectors";
import PropTypes from "prop-types";

export class ExperimentList extends React.Component {
  componentDidMount() {
    this.props.fetchExperiments();
  }

  renderTitle() {
    let title = "experiments "
    if(this.props.startDate) {
      title += `after  ${this.props.startDate}`;
    }

    return title;
  }

  render() {
    return (
      <div>
        <h1>{this.props.filteredExperiments.length} / {this.props.experimentCount} { this.renderTitle() }</h1>
        <h6>Experiments: {this.props.filteredExperiments}</h6>
      </div>
    );
  }
}

ExperimentList.propTypes = {
  experimentCount: PropTypes.number,
  fetchExperiments: PropTypes.func,
  filteredExperiments: PropTypes.array
};
const mapStateToProps = state => ({
  experimentCount: getExperimentsCount(state),
  filteredExperiments: getFilteredExperimentsByDate(state),
  startDate: getStartDate(state)
});

const mapDispatchToProps = dispatch => ({
  fetchExperiments: () => dispatch(fetchExperiments())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentList);
