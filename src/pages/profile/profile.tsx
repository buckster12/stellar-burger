import {NavLink, Route, Switch} from "react-router-dom";
import Orders from "./orders";
import ProfileInfo from "./profile-info";
import classNames from "classnames";
import styles from "./profile.module.css";
import Logout from "../logout/logout";
import React from "react";

const Profile = () => {
    return (
        <div className={styles.profileDivOverContainer}>
            <div className={styles.profileContainer}>
                <div
                    className={classNames("text text_type_main-default text_color_inactive mr-20 mt-5", styles.profileNav)}>
                    <NavLink to="/profile" exact={true} activeClassName={styles.profileNavActive}>
                        <span>Профиль</span>
                    </NavLink>
                    <NavLink to="/profile/orders" exact={true} activeClassName={styles.profileNavActive}>
                        <span>История заказов</span>
                    </NavLink>
                    <NavLink to="/profile/logout" exact={true} activeClassName={styles.profileNavActive}>
                        <span>Выход</span>
                    </NavLink>
                </div>
                <Switch>
                    <Route path="/profile/orders" exact={false} component={Orders}/>
                    <Route path="/profile" exact={true} component={ProfileInfo}/>
                    <Route path="/profile/logout" exact={true} component={Logout}/>
                </Switch>
            </div>
        </div>

    );
}

export default Profile;
