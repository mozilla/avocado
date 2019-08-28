import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, mount, configure } from "enzyme";
configure({ adapter: new Adapter() });
import ConnectedStatusSelector, {
    StatusSelector
} from "/components/status/StatusSelector";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { fromJS } from "immutable";
import thunk from "redux-thunk";
import { STATUS_SELECTED } from "/state/action-types";
import { STATUS_DRAFT } from "/constants";

describe("StatusSelector component", () => {
  it("should render the StatusSelector component", () => {
    const wrapper = shallow(
      <StatusSelector />
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should call setStatus with value when selecting new status", () => {
    let statusReceived = null;

    const dispatch = actionCreator => {
      actionCreator((action) => {
        statusReceived = action.data;
      })
    }
    
    const props = {
      dispatch,
      onChangeAction: STATUS_SELECTED
    }

    const component = mount(<StatusSelector {...props} />)

    const statusSelectTag = component.find("select[id='status']");
    statusSelectTag.simulate('change', { target: { value: STATUS_DRAFT } });

    expect(statusReceived).toEqual(STATUS_DRAFT);
  });

  it("should mount and check that correct action for setting status was dispatched", () => {
    const mockStore = configureStore([thunk]);

    const store = mockStore(
        fromJS(
            {
                status: {
                  selectedStatus: String("")
                }
            }
        )
    );

    const component = mount(
      <Provider store={store}>
        <ConnectedStatusSelector onChangeAction={STATUS_SELECTED} />
      </Provider>
    );
    const statusSelectTag = component.find("select[id='status']");
    statusSelectTag.simulate('change', {target: { value: STATUS_DRAFT } });

    const expectedAction = {
      type: STATUS_SELECTED,
      data: STATUS_DRAFT
    }
    
    expect(store.getActions()).toEqual([expectedAction]);
  });
});
