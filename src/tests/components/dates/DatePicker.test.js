import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, mount, configure } from "enzyme";
configure({ adapter: new Adapter() });
import ConnectedDatePicker, {
    DatePicker
} from "avocado/components/dates/DatePicker";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { Map } from "immutable";
import thunk from "redux-thunk";
import { START_DATE_SELECTED } from "avocado/state/action-types";

describe("DatePicker component", () => {
  it("should render the datepicker component", () => {
    const wrapper = shallow(
      <DatePicker />
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should call setStartDate with value when selecting new date", () => {
    const sampleDate = "2018-08-01";
    let startDateReceived = null;

    const dispatch = actionCreator => {
      actionCreator((action) => {
        startDateReceived = action.data;
      })
    }
    
    const props = {
      dispatch,
      onChangeAction: START_DATE_SELECTED
    }

    const component = mount(<DatePicker {...props} />)

    const dateInput = component.find("input[type='date']");
    dateInput.simulate('change', {target: { value: sampleDate }});

    expect(startDateReceived).toEqual(sampleDate);
  });

  it("should mount and check that correct action for setting start date was dispatched", () => {
    const mockStore = configureStore([thunk]);
    const store = mockStore(
      Map({
        dates: Map({
          startDate: String("")
        })
      })
    );
    let component = mount(
      <Provider store={store}>
        <ConnectedDatePicker onChangeAction={START_DATE_SELECTED} />
      </Provider>
    );
    const input = component.find('input').at(0);
    input.simulate('change', { target: { value: '2019-08-01' } })

    const expectedAction = {
      type: START_DATE_SELECTED,
      data: "2019-08-01"
    }
    
    expect(store.getActions()).toEqual([expectedAction]);
  });
});
