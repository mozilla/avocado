import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMedianArray } from "../../state/experiments/selectors";
import createPlotlyComponent from "react-plotlyjs";
import Plotly from "plotly.js/dist/plotly-cartesian";

export class ExperimentGraph extends React.Component {
  render() {
    const PlotlyComponent = createPlotlyComponent(Plotly);
    let data = [
      {
        type: "bar", // all "bar" chart attributes: #bar
        x: ["Draft", "Review", "Ship", "Accepted", "Live", "Complete"],
        y: this.props.median,
        name: "bar graph"
      }
    ];
    let layout = {
      title: "Median number of days spent in phase",
      xaxis: {
        title: "Phase"
      },
      yaxis: {
        title: "Median Days"
      }
    };
    let config = {
      showLink: false,
      displayModeBar: true
    };

    return (
      <div>
        <PlotlyComponent data={data} layout={layout} config={config} />
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
