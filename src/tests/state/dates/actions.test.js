import { setDate } from "../../../state/dates/actions";
import { START_DATE_SELECTED, END_DATE_SELECTED } from "../../../state/action-types";

describe("testing actions", () => {
  it("should set the start date", done => {
    let setDateAction = setDate("2019-06-19", START_DATE_SELECTED);

    let dispatch = action => {
        expect(action.data).toEqual("2019-06-19");
        expect(action.type).toEqual(START_DATE_SELECTED);
        done();
      };

    setDateAction(dispatch);
  });

  it("should set the end date", done => {
    let setDateAction = setDate("2019-06-20", END_DATE_SELECTED);

    let dispatch = action => {
        expect(action.data).toEqual("2019-06-20");
        expect(action.type).toEqual(END_DATE_SELECTED);
        done();
      };

    setDateAction(dispatch);
  });
});
