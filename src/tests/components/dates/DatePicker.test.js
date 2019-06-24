import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, mount, configure } from "enzyme";
configure({ adapter: new Adapter() });
import ConnectedDatePicker, {
    DatePicker
} from "../../../components/dates/DatePicker";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { List, Map } from "immutable";
import thunk from "redux-thunk";

describe("DatePicker component", () => {
  it("should render the datepicker component", () => {
    const wrapper = shallow(
      <DatePicker />
    );
    const text = wrapper.find("h5").text();
    expect(text).contains("113 experiments");
  });

  it("should ", () => {

  });

  it("should ", () => {

  });
});