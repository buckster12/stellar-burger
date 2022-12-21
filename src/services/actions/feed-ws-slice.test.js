import feedWsReducer from "./feed-ws-slice";

const initialState = {
    wsConnected: false,
    status: "idle",
    error: undefined,
    orders: [],
    total: 0,
    totalToday: 0,
}

describe("feedWsSlice", () => {
    it("should handle initial state", () => {
        expect(feedWsReducer(undefined, {})).toEqual(initialState)
    });

    // wsInit
    it("should handle wsInit", () => {
        expect(feedWsReducer(undefined, {type: "feedWs/wsInit"})).toEqual({
            wsConnected: false,
            status: "loading",
            orders: [],
            error: undefined,
            total: 0,
            totalToday: 0,
        });
    });

    // wsOpen
    it("should handle wsOpen", () => {
        expect(feedWsReducer({}, {type: "feedWs/wsOpen"})).toEqual({
            wsConnected: true,
            status: "connected",
        });
    });

    // wsClose
    it("should handle wsClose", () => {
        expect(feedWsReducer({}, {type: "feedWs/wsClose"})).toEqual({
            wsConnected: false,
            error: undefined,
            status: "idle",
        });
    });

    // wsError
    it("should handle wsError", () => {
        expect(feedWsReducer({}, {
            type: "feedWs/wsError",
            payload: {
                type: "errorType",
            }
        })).toEqual({
            wsConnected: false,
            status: "failed",
            error: "errorType"
        });
    });

    // setOrders
    it("should handle setOrders", () => {
        const testOrder = {
            _id: "1",
            ingredients: ["1", "2", "3"],
            status: "done",
            name: "test",
            createdAt: "2021-03-01T14:41:56.000Z",
            updatedAt: "2021-03-01T14:41:56.000Z",
            number: 1,
            price: 1000,
        };

        expect(feedWsReducer({}, {
            type: "feedWs/setOrders",
            payload: {
                success: true,
                orders: [
                    testOrder
                ],
                total: 5656,
                totalToday: 112
            }
        })).toEqual({
            orders: [testOrder],
            total: 5656,
            totalToday: 112,
        });
    });
});
