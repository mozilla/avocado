import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMedianArray } from "../../state/experiments/selectors";
import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js/dist/plotly-cartesian';
const PlotlyComponent = createPlotlyComponent(Plotly);

export class ExperimentGraph extends React.Component {
  render() {
    console.log(this.props.median)
    let data = [
      {
        type: 'scatter',  // all "scatter" attributes: https://plot.ly/javascript/reference/#scatter
        x: ["Draft", "Review", "Ship", "Accepted", "Live", "Complete"],
        y: this.props.median,
        marker: {
          color: 'rgb(16, 32, 77)'
        },
        name: 'line graph'
      },
      {
        type: 'bar',      // all "bar" chart attributes: #bar
        x: ["Draft", "Review", "Ship", "Accepted", "Live", "Complete"],
        y: this.props.median,
        name: 'bar graph'
      }
    ];
    let layout = {
      title: '',
      xaxis: {
        title: 'stage'
      },
      yaxis: {
        title: 'median number of days spent in stage',
      }
    };
    let config = {
      showLink: false,
      displayModeBar: true
    };

    return (
      <div className="card shadow mb-4">
        <PlotlyComponent className="whatever" data={data} layout={layout} config={config}/>
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
