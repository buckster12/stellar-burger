import {Redirect} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {logout} from "../../services/actions/logout-slice";
import Cookies from "js-cookie";
import {setIsLoggedIn} from "../../services/actions/login-slice";

const Logout = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const refreshToken = localStorage.getItem('refreshToken');
        dispatch(logout(refreshToken))
            .then((data) => {
                if (data.error) {
                    alert(data.error.message);
                    return;
                }
                if (data.payload.success) {
                    dispatch(setIsLoggedIn(false));
                    localStorage.removeItem('refreshToken');
                    Cookies.remove('accessToken');
                }
            });
    }, [dispatch]);

    return (
        <Redirect to="/login"/>
    );
}

export default Logout;
