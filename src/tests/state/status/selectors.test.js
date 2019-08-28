import { fromJS } from "immutable";
import { getStatus } from "/state/status/selectors";
import { STATUS_DRAFT } from "/constants";

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
