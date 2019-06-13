import { fetchExperiments } from "../../state/experiments/actions";
import { EXPERIMENT_DATA_RECEIVED } from "../../state/action-types";

describe("testing actions", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("calls API and returns data to me", done => {
    fetch.mockResponseOnce(JSON.stringify("12345"));

    //assert on the response
    let dispatchHandler = fetchExperiments();
    let fakeDispatch = action => {
      expect(action.data).toEqual("12345");
      expect(action.type).toEqual(EXPERIMENT_DATA_RECEIVED);
      done();
    };

    dispatchHandler(fakeDispatch);
  });
});
