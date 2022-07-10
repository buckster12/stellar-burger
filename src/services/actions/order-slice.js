import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ORDER_URL} from "../../utils/constants";

export const processOrder = createAsyncThunk(
    'order/processOrder',
    async (order) => {
        const res = await fetch(ORDER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
        });
        const data = await res.json();
        if (data.success !== true) {
            throw new Error("Не удалось оформить заказ");
        }
        return data;
    }
);

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orderId: 0,
        isOrderProcessing: false,
        isOk: false,
        isModalOpen: false,
    },
    reducers: {
        closeOrderModal: (state) => {
            state.isModalOpen = false;
        },
        setIsOk: (state, action) => {
            state.isOk = action.payload;
        },
    },
    extraReducers: {
        [processOrder.pending]: (state) => {
            state.isOrderProcessing = true;
            state.isModalOpen = true;
        },
        [processOrder.fulfilled]: (state, action) => {
            state.isOrderProcessing = false;
            state.orderId = action.payload.order.number;
            state.isOk = true;
        },
        [processOrder.rejected]: (state) => {
            state.isOrderProcessing = false;
            state.isOk = false;
        },
    }
});

export const {
    closeOrderModal,
} = orderSlice.actions;

const orderReducer = orderSlice.reducer;
export default orderReducer;
