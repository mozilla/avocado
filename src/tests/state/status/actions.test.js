import { setStatus } from "../../../state/status/actions";
import { STATUS_SELECTED } from "../../../state/action-types";

describe("testing status actions", () => {
  it("should set status to selected status", done => {
    const setStatusAction = setStatus("draft", STATUS_SELECTED);

    const dispatch = action => {
        expect(action.data).toEqual("draft");
        expect(action.type).toEqual(STATUS_SELECTED);
        done();
    };

    setStatusAction(dispatch);
  });
});
