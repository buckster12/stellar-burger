import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TOrder} from "../../types/redux";
import {TWsActions} from "../../types/types";

interface IFeedWsState {
    status: "idle" | "loading" | "failed" | "connected";
    wsConnected: boolean;
    error: string | undefined;
    orders: Array<TOrder>;
    total: number;
    totalToday: number;
}

export const initialState: IFeedWsState = {
    wsConnected: false,
    status: "idle",
    error: undefined,
    orders: [],
    total: 0,
    totalToday: 0,
};

type TWSResponse = {
    success: boolean;
    orders: Array<TOrder>;
    total: number;
    totalToday: number;
    message?: string;
};

// noinspection JSUnusedLocalSymbols
export const feedWsSlice = createSlice({
    name: 'feedWs',
    initialState,
    reducers: {
        wsInit: (state: IFeedWsState, {payload}: PayloadAction<string>) => {
            state.wsConnected = false;
            state.status = "loading";
            state.orders = [];
            state.error = undefined;
            state.total = 0;
            state.totalToday = 0;
        },
        wsOpen: (state: IFeedWsState) => {
            state.wsConnected = true;
            state.status = "connected";
        },
        wsClose: (state: IFeedWsState) => {
            state.wsConnected = false;
            state.status = "idle";
            state.error = undefined;
        },
        wsError: (state: IFeedWsState, action: PayloadAction<Event>) => {
            state.wsConnected = false;
            state.status = "failed";
            state.error = action.payload.type;
        },
        setOrders: (state: IFeedWsState, {payload}: PayloadAction<TWSResponse>) => {
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
} = feedWsSlice.actions;

export const feedWsActions: TWsActions = {
    wsInit,
    wsClose,
    setOrders,
    wsError,
    wsOpen
};

const feedWsReducer = feedWsSlice.reducer;
export default feedWsReducer;
