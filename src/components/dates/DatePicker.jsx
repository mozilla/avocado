import React from "react";
import { connect } from "react-redux";
import { getStartDate } from "../../state/dates/selectors";
import { setStartDate } from "../../state/dates/actions";

export class DatePicker extends React.Component {
  render() {
    return (
      <div>
        <label>Start date:</label>

        <input type="date" 
        onChange={ (e) => this.props.setStartDate(e.target.value)} 
        value={this.props.value} >
        </input>

        <h5>Selected Start Date: {this.props.selectedDate}</h5>
      </div>
    );
  }
}

DatePicker.propTypes = {
  value: PropTypes.string,
  selectedDate: PropTypes.func
};

const mapStateToProps = (state) => ({
  value: state.value,
  selectedDate: getStartDate(state)
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
