import {Middleware} from 'redux';
import {WS_NORMAL_CLOSE_CODE} from "../utils/constants";
import {TWsActions} from "../types/types";

export const socketMiddleware = (wsActions: TWsActions): Middleware => {
    return ((store) => {
        let socket: WebSocket | null = null;

        return (next) => (action) => {
            const {dispatch} = store;
            const {type, payload} = action;

            if (type === wsActions.wsInit.type) {
                socket = new WebSocket(payload);
            }

            if (socket) {
                if (type === wsActions.wsClose.type && socket.readyState === WebSocket.OPEN) {
                    socket.close(WS_NORMAL_CLOSE_CODE);
                    next(action);
                }
                socket.onopen = () => {
                    dispatch(wsActions.wsOpen());
                };
                socket.onerror = (event) => {
                    dispatch(wsActions.wsError(event));
                    socket = null;
                    next(action);
                };
                socket.onmessage = (event: MessageEvent) => {
                    const data = JSON.parse(event.data);
                    dispatch(wsActions.setOrders(data));
                };
                socket.onclose = () => {
                    dispatch(wsActions.wsClose());
                    socket = null;
                };
            }
            next(action);
        };
    }) as Middleware;
};
