import { fromJS } from "immutable";
import { getStatus } from "avocado/state/status/selectors";
import { STATUS_DRAFT } from "avocado/constants";

describe("Status selectors", () => {

    it("should get status that was selected", () => {
        const mockedState = fromJS({
            status: {
              selectedStatus: STATUS_DRAFT
            }
        });
        expect(getStatus(mockedState)).toEqual(STATUS_DRAFT);
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
