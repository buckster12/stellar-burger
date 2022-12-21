import orderReducer, {closeOrderModal, processOrder, setIsOk} from "./order-slice";

describe('orderSlice', () => {
    it('should return the initial state', () => {
        expect(orderReducer(undefined, {})).toEqual({
            orderId: 0,
            isOrderProcessing: false,
            isOk: false,
            isModalOpen: false,
        });
    });

    it('should handle orderProcessing', () => {
        expect(orderReducer({}, setIsOk(true))).toEqual({
            isOk: true,
        });
    });

    // closeOrderModal
    it('should handle closeOrderModal', () => {
        expect(orderReducer({}, closeOrderModal())).toEqual({
            isOk: false,
            orderId: 0,
            isModalOpen: false,
        });
    });

    it('processOrder async Thunk', () => {
        // pending
        expect(orderReducer({}, processOrder.pending)).toEqual({
            isOrderProcessing: true,
            isModalOpen: true,
        });
        // rejected
        expect(orderReducer({}, processOrder.rejected)).toEqual({
            isOrderProcessing: false,
            isOk: false,
        });
        // fulfilled
        const fulfilledPayload = {
            success: true,
            order: {number: 1}
        };
        expect(orderReducer({}, processOrder.fulfilled(fulfilledPayload))).toEqual({
            isOrderProcessing: false,
            isOk: true,
            orderId: 1,
        });
    });
});
