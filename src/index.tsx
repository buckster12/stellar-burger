import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {BrowserRouter} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from "./services/store";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    // React-Router-Dom v5 not compatible with strict mode
    // https://github.com/facebook/react/issues/24451#issuecomment-1112591413
    // <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter basename={"/stellar-burger"}>
            <App/>
        </BrowserRouter>
    </Provider>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
