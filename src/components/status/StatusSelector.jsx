import React from "react";
import { connect } from "react-redux";
import { setStatus } from "avocado/state/status/actions";
import PropTypes from "prop-types";
import { STATUSES } from "avocado/constants.js";

export class StatusSelector extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.props.setStatus(event.target.value);
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
            id="status"
          >
            <option value="">All</option>
            {Object.keys(STATUSES).map((status) => (
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
  setStatus: PropTypes.func,
  value: PropTypes.string,
};

const mapStateToProps = (state) => ({
  value: state.value,
});

const mapDispatchToProps = (dispatch) => ({
  setStatus: (status) => dispatch(setStatus(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StatusSelector);
