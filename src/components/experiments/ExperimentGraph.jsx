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
        x: [1, 2, 3, 4, 5, 6, 7],     // more about "x": #scatter-x
        y: this.props.median,     // #scatter-y
        marker: {         // marker is an object, valid marker keys: #scatter-marker
          color: 'rgb(16, 32, 77)' // more about "marker.color": #scatter-marker-color
        }
      },
      {
        type: 'bar',      // all "bar" chart attributes: #bar
        x: [1, 2, 3, 4, 5, 6, 7],     // more about "x": #bar-x
        y: this.props.median,     // #bar-y
        name: 'bar chart example' // #bar-name
      }
    ];
    let layout = {                     // all "layout" attributes: #layout
      title: 'median',  // more about "layout.title": #layout-title
      xaxis: {                  // all "layout.xaxis" attributes: #layout-xaxis
        title: 'time'         // more about "layout.xaxis.title": #layout-xaxis-title
      },
      annotations: [            // all "annotation" attributes: #layout-annotations
        {
          text: 'simple annotation',    // #layout-annotations-text
          x: 0,                         // #layout-annotations-x
          xref: 'paper',                // #layout-annotations-xref
          y: 0,                         // #layout-annotations-y
          yref: 'paper'                 // #layout-annotations-yref
        }
      ]
    };
    let config = {
      showLink: false,
      displayModeBar: true
    };

    return (
      <div>
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
