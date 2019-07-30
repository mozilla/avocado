import { fromJS } from "immutable";
import { getStatus } from "../../../state/status/selectors";

describe("Status selectors", () => {

    it("should get status that was selected", () => {
        const mockedState = fromJS({
            status: {
              selectedStatus: "Draft"
            }
        });
        expect(getStatus(mockedState)).toEqual("Draft");
    });

    it("should return null when status `All` is selected ", () => {
        const mockedState = fromJS({
            status: {
              selectedStatus: null
            }
        });
        expect(getStatus(mockedState)).toEqual(null);
    });
});
