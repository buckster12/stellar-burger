import {configureStore} from "@reduxjs/toolkit";
import ingredientsReducer from "./actions/ingredients-slice";
import basketReducer from "./actions/basket-slice";
import modalReducer from "./actions/modal-slice";
import orderReducer from "./actions/order-slice";
import loginReducer from "./actions/login-slice";
import registerReducer from "./actions/register-slice";
import logoutReducer from "./actions/logout-slice";
import profileReducer from "./actions/profile-info-slice";
import resetPasswordReducer from "./actions/reset-password-slice";
import feedWsReducer, {feedWsActions} from "./actions/feed-ws-slice";
import {socketMiddleware} from "./socketMiddleware";
import ordersWsReducer, {ordersWsActions} from "./actions/orders-ws-slice";

const store = configureStore({
    reducer: {
        ingredients: ingredientsReducer,
        basket: basketReducer,
        modal: modalReducer,
        order: orderReducer,
        login: loginReducer,
        register: registerReducer,
        logout: logoutReducer,
        profile: profileReducer,
        resetPassword: resetPasswordReducer,
        feedWs: feedWsReducer,
        ordersWs: ordersWsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(
            socketMiddleware(feedWsActions),
            socketMiddleware(ordersWsActions),
        ),
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>

export default store;
