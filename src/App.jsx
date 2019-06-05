import React from "react";
import { connect } from "react-redux";
import { fetchExperiments } from "./actions";
import { getExperimentsCount }  from "./selectors";

class ExperimentList extends React.Component {
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

const mapStateToProps = state => ({
  experimentCount: getExperimentsCount(state)
})

const mapDispatchToProps = dispatch => ({
  fetchExperiments: () => dispatch(fetchExperiments())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentList)
