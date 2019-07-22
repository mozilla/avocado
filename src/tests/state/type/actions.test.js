import { setType } from "../../../state/type/actions";
import { TYPE_SELECTED } from "../../../state/action-types";

describe("test actions for type", () => {
    it("should set the type selected to pref", done => {
        let setTypeAction = setType("pref", TYPE_SELECTED);

        let dispatch = action => {
            expect(action.data).toEqual("pref");
            expect(action.type).toEqual(TYPE_SELECTED);
            done();
        };

        setTypeAction(dispatch);
    });

    it("should set the type selected to addon", done => {
        let setTypeAction = setType("addon", TYPE_SELECTED);

        let dispatch = action => {
            expect(action.data).toEqual("addon");
            expect(action.type).toEqual(TYPE_SELECTED);
            done();
        };

        setTypeAction(dispatch);
    });
});
