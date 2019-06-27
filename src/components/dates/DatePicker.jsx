import React from "react";
import { connect } from "react-redux";
import { getStartDate } from "../../state/dates/selectors";
import { setDate } from "../../state/dates/actions";


import PropTypes from "prop-types";

export class DatePicker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.props.dispatch(setDate(event.target.value, this.props.onChangeAction))
  };

  render() {
    return (
      <div>
        <input
          type="date"
          onChange={this.onChange}
          value={this.props.value}
        />
      </div>
    );
  }
}

DatePicker.propTypes = {
  value: PropTypes.string,
  setStartDate: PropTypes.func
};

const mapStateToProps = state => ({
  value: state.value
});

export default connect(
  mapStateToProps
)(DatePicker);
