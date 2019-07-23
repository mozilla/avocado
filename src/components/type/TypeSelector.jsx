import React from "react";
import { connect } from "react-redux";
import { setType } from "../../state/type/actions";
import PropTypes from "prop-types";

export class TypeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.props.dispatch(setType(event.target.value));
  }

  render() {
    return (
      <React.Fragment>
        <h4>Type:</h4>
        <select
          id="typeSelector"
          onChange={this.onChange}
          value={this.props.value}
        >
          <option value="">--All--</option>
          <option value="addon">Add-on</option>
          <option value="pref">Pref</option>
        </select>
      </React.Fragment>
    );
  }
}

TypeSelector.propTypes = {
  value: PropTypes.string,
  setType: PropTypes.func,
  dispatch: PropTypes.func
};

const mapStateToProps = state => ({
  value: state.value
});

export default connect(mapStateToProps)(TypeSelector);
