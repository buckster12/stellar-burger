import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TOrder} from "../../types/redux";
import {TWsActions, TWSResponse} from "../../types/types";

interface IOrdersWsState {
    status: "idle" | "loading" | "failed" | "connected";
    wsConnected: boolean;
    error: string | undefined;
    orders: Array<TOrder>;
    total: number;
    totalToday: number;
}

const initialState: IOrdersWsState = {
    wsConnected: false,
    status: "idle",
    error: undefined,
    orders: [],
    total: 0,
    totalToday: 0,
};

// noinspection JSUnusedLocalSymbols
export const ordersWsSlice = createSlice({
    name: 'ordersWs',
    initialState,
    reducers: {
        wsInit: (state: IOrdersWsState, {payload}: PayloadAction<string>) => {
            state.wsConnected = false;
            state.status = "loading";
            state.orders = [];
            state.total = 0;
            state.totalToday = 0;
            state.error = undefined;
        },
        wsOpen: (state: IOrdersWsState) => {
            state.wsConnected = true;
            state.status = "connected";
        },
        wsClose: (state: IOrdersWsState) => {
            state.wsConnected = false;
            state.status = "idle";
            state.error = undefined;
        },
        wsError: (state: IOrdersWsState, action: PayloadAction<Event>) => {
            state.wsConnected = false;
            state.status = "failed";
            state.error = action.payload.type;
        },
        setOrders: (state: IOrdersWsState, {payload}: PayloadAction<TWSResponse>) => {
            if (!payload.success) {
                state.error = payload.message;
                state.status = "failed";
                state.orders = [];
                return;
            }
            state.orders = payload.orders;
            state.total = payload.total;
            state.totalToday = payload.totalToday;
        },
    },
});

export const {
    wsInit, wsClose, setOrders, wsError, wsOpen
} = ordersWsSlice.actions;

export const ordersWsActions: TWsActions = {
    wsInit,
    wsClose,
    setOrders,
    wsError,
    wsOpen
};

const ordersWsReducer = ordersWsSlice.reducer;
export default ordersWsReducer;
