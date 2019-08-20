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
      <div className="card border-left-primary shadow">
        <div className="card-body row no-gutters align-items-center">
        <h4 className="text-xs font-weight-bold text-primary text-uppercase mb-1">Type:</h4>
        <select
          class="select-css"
          id="typeSelector"
          onChange={this.onChange}
          value={this.props.value}
        >
          <option value="">All</option>
          <option value="addon">Add-on</option>
          <option value="pref">Pref</option>
        </select>
     </div>
     </div>
     
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
