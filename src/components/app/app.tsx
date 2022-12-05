import React, {useEffect} from 'react';
import styles from './app.module.css';
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
import {getAllIngredients} from "../../services/actions/ingredients-slice";
import {ILocation, ILocationBackground} from "../../types/app";
import Feed from "../feed/feed";
import FeedOrderPage from "../feed-order-page/feed-order-page";
import {useDispatch} from "../../utils/hooks";

function App() {
    const location = useLocation<ILocationBackground>();
    const background: ILocation = location.state && location.state.background;
    const dispatch = useDispatch();
    const history = useHistory();

    const handleModalClose = (): void => {
        dispatch(hideModal());
        history.replace(background);
    };

    useEffect(() => {
        dispatch(getAllIngredients());
    }, [dispatch]);

    return (
        <div className={styles.App}>
            <div className="mt-5">
                <AppHeader/>
            </div>
            <div className={styles.centerContainer}>
                <Switch location={background || location}>
                    <ProtectedRoute path={"/profile/orders/:id"} exact={true}>
                        <FeedOrderPage parent={"orders"} />
                    </ProtectedRoute>
                    <ProtectedRoute exact={false} path={["/profile"]}>
                        <Profile/>
                    </ProtectedRoute>
                    <Route path="/register" exact={true} component={Register}/>
                    <Route path="/login" exact={true} component={Login}/>
                    <Route path="/forgot-password" exact={true} component={ForgotPassword}/>
                    <Route path="/reset-password" exact={true} component={ResetPassword}/>
                    <Route exact path="/" component={Constructor}/>
                    <Route path="/ingredients/:ingredientId">
                        <IngredientDetails/>
                    </Route>
                    <Route path="/feed" exact={true} component={Feed}/>
                    <Route path="/feed/:id" exact={true}>
                        <FeedOrderPage parent={"feed"} />
                    </Route>
                    <Route path="*">
                        <Page404/>
                    </Route>
                </Switch>
                {background && (
                    <>
                        <Route path="/ingredients/:ingredientId">
                            <Modal onClose={handleModalClose} title="">
                                <IngredientDetails/>
                            </Modal>
                        </Route>
                        <Route path='/feed/:id'>
                            <Modal onClose={handleModalClose} title={
                                '#' + history.location.pathname.split('/')[2]
                            }>
                                <FeedOrderPage modal={true} parent={"feed"} />
                            </Modal>
                        </Route>
                        <ProtectedRoute path='/profile/orders/:id'>
                            <Modal onClose={handleModalClose} title={
                                '#' + history.location.pathname.split('/')[3]
                            }>
                                <FeedOrderPage modal={true} parent={"orders"} />
                            </Modal>
                        </ProtectedRoute>
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
