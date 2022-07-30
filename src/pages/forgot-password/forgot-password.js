import classNames from "classnames";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory} from "react-router-dom";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {resetPassword} from "../../services/actions/reset-password-slice";

const ForgotPassword = () => {
    const auth = useSelector(state => state.login.isLoggedIn);
    const history = useHistory();
    const dispatch = useDispatch();

    const {
        email,
        error,
        isLoading
    } = useSelector(state => state.resetPassword);

    const onChange = (e) => {
        dispatch({
            type: "resetPassword/setEmail",
            payload: e.target.value
        });
    }

    const onClickFunction = async (e) => {
        e.preventDefault();
        if (!error) {
            const data = await dispatch(resetPassword(email));
            if (data.payload.success) {
                history.push("/reset-password", {
                    from: "/forgot-password"
                });
            }
        }
    }

    if (auth) {
        history.replace("/");
        return (
            <Redirect to="/"/>
        );
    }

    return (
        <form onSubmit={onClickFunction}>
            <div className={classNames("pt-6 pb-6")}>
                <p className="text text_type_main-medium">Восстановление пароля</p>
            </div>

            {isLoading && (
                <div className={'text_type_main-default text_color_inactive'}>Загрузка...</div>
            )}

            <div className={classNames("pb-6")}>
                <Input
                    type={'email'}
                    placeholder={'E-mail'}
                    onChange={onChange}
                    name={'email'}
                    error={error}
                    value={email}
                    size={'default'}
                    errorText={'Некорректный email'}
                />
            </div>

            <Button
                type="primary"
                disabled={error}
                size="medium">
                Восстановить
            </Button>

            <div className={classNames("pt-6 pb-6")}>
                <p className="text text_type_main-small text_color_inactive">
                    Вспомнили пароль?&nbsp;
                    <Link to="/login">Войти</Link>
                </p>
            </div>
        </form>
    );
}

export default ForgotPassword;
