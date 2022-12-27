import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ORDER_URL} from "../../utils/constants";
import checkResponse from "../../utils/check-response";
import {getCookie} from "../auth";

type TThunkResponse = {
    success: boolean;
    order: {
        number: number;
    };
    message: string;
};

export const processOrder = createAsyncThunk<TThunkResponse, Array<string>>(
    'order/processOrder',
    async (order: Array<string>) => {
        const res = await fetch(ORDER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('accessToken')}`,
            },
            body: JSON.stringify({ingredients: order}),
        });
        const data = await checkResponse<TThunkResponse>(res).catch(err => {
            throw err;
        });
        if (!data.success) {
            throw new Error("Не удалось оформить заказ");
        }
        return data;
    }
);

type TOrderState = {
    orderId: number,
    isOrderProcessing: boolean,
    isOk: boolean,
    isModalOpen: boolean,
};

const initialState: TOrderState = {
    orderId: 0,
    isOrderProcessing: false,
    isOk: false,
    isModalOpen: false,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        closeOrderModal: (state: TOrderState) => {
            state.isModalOpen = false;
            state.orderId = 0; // сбрасываем ордер из памяти
            state.isOk = false; // сбрасываем статус отправки заказа
        },
        setIsOk: (state: TOrderState, action: PayloadAction<boolean>) => {
            state.isOk = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(processOrder.pending, (state: TOrderState) => {
            state.isOrderProcessing = true;
            state.isModalOpen = true;
        });
        builder.addCase(processOrder.fulfilled, (state: TOrderState, action: PayloadAction<TThunkResponse>) => {
            state.isOrderProcessing = false;
            state.orderId = action.payload.order.number;
            state.isOk = true;
        });
        builder.addCase(processOrder.rejected, (state: TOrderState) => {
            state.isOrderProcessing = false;
            state.isOk = false;
        });
    }
});

export const {
    closeOrderModal,
    setIsOk,
} = orderSlice.actions;

const orderReducer = orderSlice.reducer;
export default orderReducer;
