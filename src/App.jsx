import React from "react";
import { connect } from "react-redux";
import { fetchExperiments } from "./actions";
import { getExperimentsCount }  from "./selectors";

export class ExperimentList extends React.Component {
  componentDidMount() {
    this.props.fetchExperiments();
  }

  render(){
    return (
        <div>
          <h1>
            {this.props.experimentCount} experiments
          </h1>
        </div>
    )
  }
}

/* istanbul ignore next */
const mapStateToProps = state => ({
  experimentCount: getExperimentsCount(state)
})

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  fetchExperiments: () => dispatch(fetchExperiments())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentList)
