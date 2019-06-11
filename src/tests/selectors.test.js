import { List, Map } from "immutable";
import { getExperimentsCount } from "../state/selectors";

describe("Selectors", () => {
  it("should get experiment count", () => {
    let mockedState = Map({
      experiments: Map({
        items: List([1, 2, 3, 4])
      })
    });
    expect(getExperimentsCount(mockedState)).toEqual(4);
  });
});
