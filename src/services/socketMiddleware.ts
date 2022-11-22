import {Middleware} from 'redux';
import {setOrders, TWsActions, wsClose, wsError, wsOpen} from "./actions/feed-ws-slice";
import {WS_NORMAL_CLOSE_CODE} from "../utils/constants";

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
                if (type === wsActions.wsClose.type) {
                    socket.close(WS_NORMAL_CLOSE_CODE);
                    next(action);
                }

                socket.onopen = () => {
                    dispatch(wsOpen());
                };

                socket.onerror = (event) => {
                    dispatch(wsError(event));
                    socket = null;
                    next(action);
                };

                socket.onmessage = (event: MessageEvent) => {
                    const data = JSON.parse(event.data);
                    dispatch(setOrders(data));
                };

                socket.onclose = () => {
                    dispatch(wsClose());
                    socket = null;
                };
            }
            next(action);
        };
    }) as Middleware;
};
