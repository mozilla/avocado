import experiments  from "./reducer";
import { fromJS, List } from 'immutable';
import thunk from "redux-thunk";

describe("Reducer", () => {
  it("should test default action", () => { 
    let expectedState = fromJS({"items": []});
    expect(experiments(undefined, {})).toEqual(expectedState);
  });
});