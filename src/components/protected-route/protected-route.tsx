import {Redirect, Route, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {IMainState} from "../../types/redux";
import React from "react";

type TProtectedRouteProps = {
    Component: React.ComponentType<any>,
    path: string,
}

const ProtectedRoute = ({Component, path}: TProtectedRouteProps) => {
    const location = useLocation();
    const {auth} = useSelector((state: IMainState) => ({
        auth: state.login.isLoggedIn,
    }));
    return (
        <Route
            path={path}
            render={(props) =>
                auth ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{pathname: "/login", state: {from: location}}}/>
                )
            }
        />
    );
}

export default ProtectedRoute;
