import {Redirect} from "react-router-dom";
import {useEffect} from "react";
import {logout} from "../../services/actions/logout-slice";
import Cookies from "js-cookie";
import {setIsLoggedIn} from "../../services/actions/login-slice";
import {useDispatch} from "../../utils/hooks";

const Logout = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const refreshToken = localStorage.getItem('refreshToken') || '';
        dispatch(logout(refreshToken))
            .unwrap()
            .then((data) => {
                if (data.error) {
                    alert(data.error.message);
                    return;
                }
                if (data.success) {
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
