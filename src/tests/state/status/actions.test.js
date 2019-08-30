import { setStatus } from "avocado/state/status/actions";
import { STATUS_SELECTED } from "avocado/state/action-types";
import { STATUS_DRAFT } from "avocado/constants";

describe("testing status actions", () => {
  it("should set status to selected status", done => {
    const setStatusAction = setStatus(STATUS_DRAFT, STATUS_SELECTED);

    const dispatch = action => {
        expect(action.data).toEqual(STATUS_DRAFT);
        expect(action.type).toEqual(STATUS_SELECTED);
        done();
    };

    setStatusAction(dispatch);
  });
});
