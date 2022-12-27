import ordersWsReducer, {initialState, setOrders, wsClose, wsError, wsInit, wsOpen} from "./orders-ws-slice";

describe("orderWsSlice", () => {

    it("should return the initial state", () => {
        expect(ordersWsReducer(undefined, {})).toEqual(initialState);
    });

    it("should handle wsInit", () => {
        expect(
            ordersWsReducer(undefined, wsInit())
        ).toEqual({
            ...initialState,
            status: "loading",
        });
    });

    it("should handle wsOpen", () => {
        expect(
            ordersWsReducer(undefined, wsOpen())
        ).toEqual({
            ...initialState,
            wsConnected: true,
            status: "connected",
        });
    });

    it("should handle wsClose", () => {
        expect(
            ordersWsReducer(undefined, wsClose())
        ).toEqual({
            ...initialState
        });
    });

    it("should handle wsError", () => {
        expect(
            ordersWsReducer(undefined, wsError({type: "errorType"}))
        ).toEqual({
            ...initialState,
            error: "errorType",
            status: "failed",
        });
    });

    // setOrders
    it("should handle setOrders", () => {
        const successTrue = {
            success: true,
            orders: [
                {
                    "_id": "63a2ea9699a25c001cd6b72e",
                    "ingredients": [
                        "60d3b41abdacab0026a733c6",
                        "60d3b41abdacab0026a733c6"
                    ],
                    "status": "done",
                    "name": "Супер бургер",
                    "createdAt": "2022-12-21T11:14:30.784Z",
                    "updatedAt": "2022-12-21T11:14:31.256Z",
                    "number": 35056
                }
            ],
            total: 5555,
            totalToday: 111
        };

        const successFalse = {
            success: false,
            orders: [],
            total: 0,
            totalToday: 0,
            message: "some error"
        }

        expect(
            ordersWsReducer(undefined, setOrders(successTrue))
        ).toEqual({
            ...initialState,
            orders: successTrue.orders,
            total: successTrue.total,
            totalToday: successTrue.totalToday,
        });

        expect(
            ordersWsReducer(undefined, setOrders(successFalse))).toEqual({
            ...initialState,
            error: successFalse.message,
            status: "failed",
        });
    });
});