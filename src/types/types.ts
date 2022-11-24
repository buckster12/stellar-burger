import {ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {TOrder} from "./redux";

export interface ILocationState {
    from: string;
    passwordReset?: boolean;
}

export type TWsActions = {
    wsInit: ActionCreatorWithPayload<string>,
    wsClose: ActionCreatorWithPayload<void>,
    setOrders: ActionCreatorWithPayload<TWSResponse>,
    wsError: ActionCreatorWithPayload<Event>,
    wsOpen: ActionCreatorWithPayload<void>
};

export type TWSResponse = {
    success: boolean;
    orders: Array<TOrder>;
    total: number;
    totalToday: number;
    message?: string;
};
