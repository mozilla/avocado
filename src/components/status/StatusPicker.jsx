import React from "react";
import { connect } from "react-redux";
import { setStatus } from "../../state/status/actions";
import PropTypes from "prop-types";

export class StatusPicker extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.props.dispatch(setStatus(event.target.value));
  }

  render() {
    return (
        <div>
            <h4>Status:</h4>
            <select id="stage" onChange={this.onChange} value={this.props.value}>
                <option value="">--Please choose an option--</option>
                <option value="draft">Draft</option>
                <option value="review">review</option>
                <option value="ship">ship</option>
                <option value="accepted">accepted</option>
                <option value="live">live</option>
                <option value="complete">complete</option>
                <option value="rejected">rejected</option>
            </select>
        </div>   
    );
  }
}

StatusPicker.propTypes = {
  value: PropTypes.string,
  setDate: PropTypes.func,
  dispatch: PropTypes.func
};

const mapStateToProps = state => ({
  value: state.value
});

export default connect(mapStateToProps)(StatusPicker);

