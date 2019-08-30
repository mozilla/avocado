import React from "react";
import { connect } from "react-redux";
import { setStatus } from "../../state/status/actions";
import PropTypes from "prop-types";
import { STATUSES } from "./../../constants.js";

export class StatusSelector extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.props.dispatch(setStatus(event.target.value));
  }

  render() {
    return (
      <div className="card shadow border-left-yellow">
        <div className="card-body">
          <h4 className="card-title">Status</h4>
          <select
            className="form-control"
            onChange={this.onChange}
            value={this.props.value}
            id="select"
          >
            <option value="">All</option>
            {Object.keys(STATUSES).map(status => (
              <option value={status} key={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}


StatusSelector.propTypes = {
  value: PropTypes.string,
  setStatus: PropTypes.func,
  dispatch: PropTypes.func
};

const mapStateToProps = state => ({
  value: state.value
});

export default connect(mapStateToProps)(StatusSelector);
