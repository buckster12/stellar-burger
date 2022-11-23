import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TOrder} from "../../types/redux";

export interface FeedState {
    status: "idle" | "loading" | "failed" | "connected";
    wsConnected: boolean;
    error: string | undefined;
    orders: Array<TOrder>;
    total: number;
    totalToday: number;
}

const initialState: FeedState = {
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
        wsInit: (state: FeedState, {payload}: PayloadAction<string>) => {
            state.wsConnected = false;
            state.status = "loading";
            state.orders = [];
            state.total = 0;
            state.totalToday = 0;
        },
        wsOpen: (state: FeedState) => {
            state.wsConnected = true;
            state.status = "connected";
        },
        wsClose: (state: FeedState) => {
            state.wsConnected = false;
            state.status = "idle";
        },
        wsError: (state: FeedState, action: PayloadAction<Event>) => {
            state.wsConnected = false;
            state.status = "failed";
            state.error = action.payload.type;
        },
        setOrders: (state: FeedState, {payload}: PayloadAction<TWSResponse>) => {
            if(!payload.success) {
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

export const wsActions = {
    wsInit,
    wsClose,
    setOrders,
    wsError,
    wsOpen
};

export type TWsActions = {
    wsInit: typeof wsInit,
    wsClose: typeof wsClose,
    setOrders: typeof setOrders,
    wsError: typeof wsError,
    wsOpen: typeof wsOpen
};

const feedWsReducer = feedWsSlice.reducer;
export default feedWsReducer;
