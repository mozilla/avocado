import React from "react";
import { connect } from "react-redux";
import { ExperimentTable } from "./ExperimentTable";
import { fetchExperiments } from "../../state/experiments/actions";
import {
  getExperimentsCount,
  getFilteredExperiments,
  getStatusDates,
  getMedianArray
} from "../../state/experiments/selectors";
import { getStartDate, getEndDate } from "../../state/dates/selectors";
import PropTypes from "prop-types";
import { List } from "immutable";
import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js/dist/plotly-cartesian';
const PlotlyComponent = createPlotlyComponent(Plotly);

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
        <h1>
          {this.props.filteredExperiments.size} / {this.props.experimentCount}{" "}
          {this.renderTitle()}
          <PlotlyComponent className="whatever" data={data} layout={layout} config={config}/>
        </h1>
        <h6>{this.props.median}</h6>
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
  endDate: getEndDate(state),
  changeLog: getStatusDates(state),
  median: getMedianArray(state)
});

const mapDispatchToProps = dispatch => ({
  fetchExperiments: () => dispatch(fetchExperiments())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentList);
