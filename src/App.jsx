import React from "react";
import { connect } from "react-redux";
import { fetchExperiments } from "./actions";

class ExperimentList extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    console.log('calling fetch experiments in render')
    let data = this.props.fetchExperiments();
    return (
        <div>
          <h1>
            Hello
          </h1>
        </div>
    )
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  fetchExperiments: () => dispatch(fetchExperiments())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentList);
