import React from 'react';
import AppStyle from './app.module.css';
import AppHeader from "../app-header/app-header";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "../../pages/login/login";
import Page404 from "../../pages/page404/page404";
import Constructor from "../../pages/constructor/constructor";
import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import Profile from "../../pages/profile/profile";
import ResetPassword from "../../pages/reset-password/reset-password";
import ProtectedRoute from "../protected-route/protected-route";
import ModalSwitch from "../modal-switch/modal-switch";

function App() {
    return (
        <div className={AppStyle.App}>
            <Router>
                <div className="mt-5">
                    <AppHeader/>
                </div>
                <div className={AppStyle.centerContainer}>
                    <Switch>
                        <ProtectedRoute path="/profile" component={Profile}/>
                        <Route path="/register" exact={true} component={Register}/>
                        <Route path="/login" exact={true} component={Login}/>
                        <Route path="/forgot-password" exact={true} component={ForgotPassword}/>
                        <Route path="/reset-password" exact={true} component={ResetPassword}/>
                        <Route path="/" exact={true} component={Constructor}/>
                        <ModalSwitch/>
                        <Route path="*">
                            <Page404/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
