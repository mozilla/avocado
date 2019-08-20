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
      <div className="card border-left-success shadow h-100 py-2">
        <div className="card-body row no-gutters align-items-center">
          <h4 className="text-xs font-weight-bold text-primary text-uppercase mb-1">Status:</h4>
          <select class="select-css" id="status" onChange={this.onChange} value={this.props.value}>
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
