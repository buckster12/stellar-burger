import logoutReducer, {logout} from "./logout-slice";

describe("logoutSlice", () => {
    // initial state
    it("should have initial state", () => {
        expect(logoutReducer(undefined, {})).toEqual({
            isLoading: false,
        });
    });

    // logout pending
    it("should handle logout pending", () => {
        expect(logoutReducer({isLoading: false}, logout.pending)).toEqual({
            isLoading: true,
        });
    });

    it("should handle logout fulfilled", () => {
        expect(logoutReducer({isLoading: true}, logout.fulfilled)).toEqual({
            isLoading: false,
        });
    });

    it("should handle logout rejected", () => {
        expect(logoutReducer({isLoading: true}, logout.rejected)).toEqual({
            isLoading: false,
        });
    });
});
