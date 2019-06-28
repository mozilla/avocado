import { setStartDate } from "../../../state/dates/actions";
import { START_DATE_SELECTED } from "../../../state/action-types";

describe("testing actions", () => {
  it("should set the start date", done => {
    let setDate = setStartDate("2019-06-19");

    let dispatch = action => {
        expect(action.data).toEqual("2019-06-19");
        expect(action.type).toEqual(START_DATE_SELECTED);
        done();
      };

    setDate(dispatch);
  });
});
