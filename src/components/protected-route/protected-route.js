import {Redirect, Route} from "react-router-dom";
import {useSelector} from "react-redux";

const ProtectedRoute = ({component: Component, ...rest}) => {
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
                    <Redirect to="/login"/>
                )
            }
        />
    );
}

export default ProtectedRoute;
