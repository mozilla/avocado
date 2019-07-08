import React from "react";
import { connect } from "react-redux";
import { fetchExperiments } from "../../state/experiments/actions";
import {
  getExperimentsCount,
  getFilteredExperimentsByDate
} from "../../state/experiments/selectors";
import PropTypes from "prop-types";

export class ExperimentList extends React.Component {
  componentDidMount() {
    this.props.fetchExperiments();
  }

  render() {
    return (
      <div>
        <h1>{this.props.experimentCount} experiments</h1>
        <h6>Experiments: {this.props.filteredExperiments}</h6>
      </div>
    );
  }
}

ExperimentList.propTypes = {
  experimentCount: PropTypes.number,
  fetchExperiments: PropTypes.func,
  filteredExperiments: PropTypes.func
};
const mapStateToProps = state => ({
  experimentCount: getExperimentsCount(state),
  filteredExperiments: getFilteredExperimentsByDate(state)
});

const mapDispatchToProps = dispatch => ({
  fetchExperiments: () => dispatch(fetchExperiments())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentList);
