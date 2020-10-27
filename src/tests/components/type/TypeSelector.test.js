import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, mount, configure } from "enzyme";
configure({ adapter: new Adapter() });
import ConnectedTypeSelector, {
  TypeSelector,
} from "avocado/components/type/TypeSelector";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { Map } from "immutable";
import thunk from "redux-thunk";
import { TYPE_SELECTED } from "avocado/state/action-types";

describe("TypeSelector component", () => {
  it("should render the TypeSelector component", () => {
    const wrapper = shallow(<TypeSelector />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should call setType with value when selecting to filter by types", () => {
    let typeReceived = null;

    const dispatch = (actionCreator) => {
      actionCreator((action) => {
        typeReceived = action.data;
      });
    };

    const props = {
      dispatch,
    };

    const component = mount(<TypeSelector {...props} />);

    const typeSelector = component.find("#typeSelector");
    typeSelector
      .find("Select")
      .instance()
      .selectOption({ value: "pref", label: "Pref" });

    typeSelector
      .find("Select")
      .instance()
      .selectOption({ value: "addon", label: "Addon" });

    expect(typeReceived).toEqual(["pref", "addon"]);
  });

  it("should mount and check that correct action for setting type was dispatched", () => {
    const mockStore = configureStore([thunk]);
    const store = mockStore(
      Map({
        type: Map({
          selectedType: null,
        }),
      })
    );
    let component = mount(
      <Provider store={store}>
        <ConnectedTypeSelector />
      </Provider>
    );
    const typeSelector = component.find("#typeSelector");
    typeSelector
      .find("Select")
      .instance()
      .selectOption({ value: "addon", label: "Addon" });

    const expectedAction = {
      type: TYPE_SELECTED,
      data: ["addon"],
    };

    expect(store.getActions()).toEqual([expectedAction]);
  });
});
