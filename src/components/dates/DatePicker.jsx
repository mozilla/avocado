import React from "react";
import { connect } from "react-redux";
import { setDate } from "../../state/dates/actions";

import PropTypes from "prop-types";

export class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  

  onChange(event) {
    this.props.dispatch(setDate(event.target.value, this.props.onChangeAction));
  }

  render() {
    return (
      <div className={`card shadow border-left-${this.props.colour}`}>
        <div className="card-body ">
          <h4 className="card-title">{this.props.title}</h4>
          <input className="form-control" type="date" onChange={this.onChange} value={this.props.value} />
        </div>
        
      </div>
    );
  }
}

DatePicker.propTypes = {
  value: PropTypes.string,
  setDate: PropTypes.func,
  dispatch: PropTypes.func,
  onChangeAction: PropTypes.string,
  title: PropTypes.string,
  colour: PropTypes.string
};

const mapStateToProps = state => ({
  value: state.value
});

export default connect(mapStateToProps)(DatePicker);
