import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, mount, configure } from "enzyme";
configure({ adapter: new Adapter() });
import ConnectedTypeSelector, {
    TypeSelector
} from "../../../components/type/TypeSelector";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { Map } from "immutable";
import thunk from "redux-thunk";
import { TYPE_SELECTED } from "../../../state/action-types";

describe("TypeSelector component", () => {
  it("should render the TypeSelector component", () => {
    const wrapper = shallow(
      <TypeSelector />
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should call setType with value when selecting to filter by type", () => {
    let typeReceived = null;

    const dispatch = actionCreator => {
      actionCreator((action) => {
        typeReceived = action.data;
      })
    }
    
    const props = { 
      dispatch
    }

    const component = mount(<TypeSelector {...props} />)

    const typeSelector = component.find("select[id='typeSelector']");
    typeSelector.simulate('change', {target: { value: "pref" }});

    expect(typeReceived).toEqual("pref");
  });

  it("should mount and check that correct action for setting type was dispatched", () => {
    const mockStore = configureStore([thunk]);
    const store = mockStore(
      Map({
        type: Map({
          selectedType: null
        })
      })
    );
    let component = mount(
      <Provider store={store}>
        <ConnectedTypeSelector />
      </Provider>
    );
    const selector = component.find("select[id='typeSelector']");
    selector.simulate('change', { target: { value: 'addon' } })

    const expectedAction = {
      type: TYPE_SELECTED,
      data: "addon"
    }
    
    expect(store.getActions()).toEqual([expectedAction]);
  });
});
