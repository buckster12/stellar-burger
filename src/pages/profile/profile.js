import {NavLink, Route, Switch} from "react-router-dom";
import Orders from "./orders";
import ProfileInfo from "./profile-info";
import classNames from "classnames";
import ProfileStyle from "./profile.module.css";
import Logout from "../logout/logout";

const Profile = () => {
    return (
        <div style={{display: "flex", width: "100%", justifyContent: "left"}}>
            <div className={ProfileStyle.profileContainer}>
                <div
                    className={classNames("text text_type_main-default text_color_inactive mr-20 mt-5", ProfileStyle.profileNav)}>
                    <NavLink to="/profile" exact={true} activeClassName={ProfileStyle.profileNavActive}>
                        <span>Профиль</span>
                    </NavLink>
                    <NavLink to="/profile/orders" exact={true} activeClassName={ProfileStyle.profileNavActive}>
                        <span>История заказов</span>
                    </NavLink>
                    <NavLink to="/profile/logout" exact={true} activeClassName={ProfileStyle.profileNavActive}>
                        <span>Выход</span>
                    </NavLink>
                </div>
                <Switch>
                    <Route path="/profile/orders" exact={true} component={Orders}/>
                    <Route path="/profile" exact={true} component={ProfileInfo}/>
                    <Route path="/profile/logout" exact={true} component={Logout}/>
                </Switch>
            </div>
        </div>

    );
}

export default Profile;
