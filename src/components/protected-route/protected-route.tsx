import {Redirect, Route, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {IMainState} from "../../types/redux";
import React from "react";

type TProtectedRouteProps = {
    path: string,
    exact?: boolean,
    children: React.ReactNode,
}

const ProtectedRoute = ({path, children, exact = false}: TProtectedRouteProps) => {
    const location = useLocation();
    const {auth} = useSelector((state: IMainState) => ({
        auth: state.login.isLoggedIn,
    }));
    return (
        <Route
            exact={exact}
            path={path}
            render={() =>
                auth ? (
                    children
                ) : (
                    <Redirect to={{pathname: "/login", state: {from: location}}}/>
                )
            }
        />
    );
}

export default ProtectedRoute;
