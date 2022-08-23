import {Redirect, Route, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

const ProtectedRoute = ({component: Component, ...rest}) => {
    const location = useLocation();
    const {auth} = useSelector(state => ({
        auth: state.login.isLoggedIn,
    }));
    return (
        <Route
            {...rest}
            render={props =>
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
