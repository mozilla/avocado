import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { START_DATE_SELECTED } from "../state/types";
import { getStartDate } from "../state/selectors";
import { setStartDate } from "../state/actions";

export class DatePicker extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <div>
        <label for="start">Start date:</label>

        <input type="date" id="start" name="start-date"
        value="2018-07-22" onChange={ (e) => this.props.setStartDate(e.target.value)} 
        value={this.props.value} >
        </input>

        <h5>Selected Start Date: {this.props.selectedVal}</h5>
      </div>
    );
  }
}

DatePicker.propTypes = {
};

const mapStateToProps = (state) => ({
  value: state.value,
  selectedVal: getStartDate(state)
})

const mapDispatchToProps = dispatch => {
  return {
    setStartDate: date => {
      dispatch(setStartDate(date))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatePicker);
