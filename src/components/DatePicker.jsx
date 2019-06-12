import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class DatePicker extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <div>
        <label for="start">Start date:</label>

        <input type="date" id="start" name="trip-start"
        value="2018-07-22"
        min="2018-01-01" max="2018-12-31">
        </input>
      </div>
    );
  }
}

DatePicker.propTypes = {
};

const mapStateToProps = state => ({
  
});

const mapDispatchToProps = dispatch => ({
  
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatePicker);
