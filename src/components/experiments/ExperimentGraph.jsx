import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMedianArray } from "avocado/state/experiments/selectors";

export class ExperimentGraph extends React.Component {
  render() {
    return (
      <div>
        <h4>
          Temporarily displaying median array: [ {this.props.median.toString()}{" "}
          ] (will be replaced with graph in next PR)
        </h4>
      </div>
    );
  }
}

ExperimentGraph.propTypes = {
  median: PropTypes.instanceOf(Array)
};

const mapStateToProps = state => ({
  median: getMedianArray(state)
});

export default connect(mapStateToProps)(ExperimentGraph);
