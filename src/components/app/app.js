import React from 'react';
import AppStyle from './app.module.css';
import AppHeader from "../app-header/app-header";
import {Route, Switch, useHistory, useLocation} from "react-router-dom";
import Login from "../../pages/login/login";
import Page404 from "../../pages/page404/page404";
import Constructor from "../../pages/constructor/constructor";
import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import Profile from "../../pages/profile/profile";
import ResetPassword from "../../pages/reset-password/reset-password";
import ProtectedRoute from "../protected-route/protected-route";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import {hideModal} from "../../services/actions/modal-slice";
import {useDispatch} from "react-redux";

function App() {
    const location = useLocation();
    const background = location.state && location.state.background;
    const dispatch = useDispatch();
    const history = useHistory();

    const handleModalClose = () => {
        dispatch(hideModal());
        history.replace(background);
    };

    return (
        <div className={AppStyle.App}>
            <div className="mt-5">
                <AppHeader/>
            </div>
            <div className={AppStyle.centerContainer}>
                <Switch location={background || location}>
                    <ProtectedRoute path="/profile" component={Profile}/>
                    <Route path="/register" exact={true} component={Register}/>
                    <Route path="/login" exact={true} component={Login}/>
                    <Route path="/forgot-password" exact={true} component={ForgotPassword}/>
                    <Route path="/reset-password" exact={true} component={ResetPassword}/>
                    <Route exact path="/" component={Constructor}/>
                    <Route path="/ingredients/:ingredientId">
                        <IngredientDetails noBackground={true}/>
                    </Route>
                    <Route path="*">
                        <Page404/>
                    </Route>
                </Switch>
                {background &&
                    <Route path="/ingredients/:ingredientId">
                        <Modal onClose={handleModalClose} title="">
                            <IngredientDetails noBackground={false}/>
                        </Modal>
                    </Route>}
            </div>
        </div>
    );
}

export default App;
