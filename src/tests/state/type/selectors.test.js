import { fromJS } from "immutable";
import { getType } from "avocado/state/type/selectors";

describe("Type selectors", () => {
    it("should get selected type to be pref", () => {
        let mockedState = fromJS({
            type: {
                selectedType: "pref"
            }
        });
      
        expect(getType(mockedState)).toEqual("pref");
    });

    it("should get selected type to be addon", () => {
        let mockedState = fromJS({
            type: {
                selectedType: "pref"
            }
        });
      
        expect(getType(mockedState)).toEqual("pref");
    });

    it("should get all types", () => {
        let mockedState = fromJS({
            type: {
                selectedType: null
            }
        });
      
        expect(getType(mockedState)).toEqual(null);
    });
});
