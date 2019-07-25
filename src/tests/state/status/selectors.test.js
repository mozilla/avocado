import { fromJS } from "immutable";
import { getStatus } from "../../../state/status/selectors";

describe("Status selectors", () => {
    const getMockedState = status => {
        return fromJS({
            status: {
              selectedStatus: status
            }
        });
    }

    it("should get draft status", () => {
        const mockedState = getMockedState("draft")
        expect(getStatus(mockedState)).toEqual("draft");
    });

    it("should get review status", () => {
        const mockedState = getMockedState("review")
        expect(getStatus(mockedState)).toEqual("review");
    });

    it("should get ship status", () => {
        const mockedState = getMockedState("ship")
        expect(getStatus(mockedState)).toEqual("ship");
    });

    it("should get accepted status", () => {
        const mockedState = getMockedState("accepted")
        expect(getStatus(mockedState)).toEqual("accepted");
    });

    it("should get live status", () => {
        const mockedState = getMockedState("live")
        expect(getStatus(mockedState)).toEqual("live");
    });

    it("should get complete status", () => {
        const mockedState = getMockedState("complete")
        expect(getStatus(mockedState)).toEqual("complete");
    });

    it("should get rejected status", () => {
        const mockedState = getMockedState("rejected")
        expect(getStatus(mockedState)).toEqual("rejected");
    });
});
