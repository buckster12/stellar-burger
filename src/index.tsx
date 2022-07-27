import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {configureStore} from '@reduxjs/toolkit';

import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import ingredientsReducer from "./services/actions/ingredients-slice";
import basketReducer from './services/actions/basket-slice';
import modalReducer from './services/actions/modal-slice';
import orderReducer from "./services/actions/order-slice";
import loginReducer from "./services/actions/login-slice";
import registerReducer from "./services/actions/register-slice";
import logoutReducer from "./services/actions/logout-slice";
import profileReducer from "./services/actions/profile-info-slice";
import resetPasswordReducer from "./services/actions/reset-password-slice";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

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
        resetPassword: resetPasswordReducer
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: true,
});

root.render(
    // React-Router-Dom v5 not compatible with strict mode
    // https://github.com/facebook/react/issues/24451#issuecomment-1112591413
    // <React.StrictMode>
    <Provider store={store}>
        <App/>
    </Provider>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
