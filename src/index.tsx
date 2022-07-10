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

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const store = configureStore({
    reducer: {
        ingredients: ingredientsReducer,
        basket: basketReducer,
        modal: modalReducer,
        order: orderReducer
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: true,
});

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
