import {Redirect} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {logout} from "../../services/actions/logout-slice";
import Cookies from "js-cookie";
import {setIsLoggedIn} from "../../services/actions/login-slice";

type TLogoutResponse = {
    error?: {
        message: string
    },
    payload: {
        success: boolean
    }
}

const Logout = () => {
    const dispatch = useDispatch<any>();
    useEffect(() => {
        const refreshToken = localStorage.getItem('refreshToken');
        // @ts-ignore
        dispatch(logout(refreshToken))
            .then((data: TLogoutResponse) => {
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
