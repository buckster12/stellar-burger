import {Link, useHistory, useLocation} from "react-router-dom";
import React, {FormEvent} from "react";
import Page404 from "../page404/page404";
import classNames from "classnames";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import cssStyle from "./reset-password.module.css";
import {
    clearData,
    setEmailToken,
    setNewPassword,
    setNewPasswordRequest
} from "../../services/actions/reset-password-slice";
import {ILocationState} from "../../types/types";
import {useDispatch, useSelector} from "../../utils/hooks";

const ResetPassword = () => {
    const history = useHistory();
    const location = useLocation<ILocationState>();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.login.isLoggedIn);
    const {newPassword, emailToken, isLoading, errorMessage} = useSelector((state) => state.resetPassword);

    // if user is logged in, redirect to constructor page
    if (auth) {
        history.replace("/");
    }

    // Display 404 if user was not redirected from the forgot password page
    if (!location.state || location.state.from !== '/forgot-password') {
        return (
            <Page404/>
        );
    }

    async function onClickFunction(e: FormEvent) {
        e.preventDefault();
        const data = await dispatch(setNewPasswordRequest({
            token: emailToken,
            password: newPassword
        })).unwrap();
        if (data.success) {
            dispatch(clearData());
            history.push("/login");
            history.replace({
                pathname: "/login",
                state: {
                    passwordReset: true
                }
            })
        }
    }

    return (
        <div className={cssStyle.flexContainer}>
            <form onSubmit={onClickFunction}>
                <div className={classNames("pt-6 pb-6")}>
                    <p className="text text_type_main-medium">Восстановление пароля</p>
                </div>

                {errorMessage &&
                    <div className={classNames('text_type_main-small text', cssStyle.errorMessage)}>
                        {errorMessage}
                    </div>}

                {isLoading && <div className='text_type_main-small text'>
                    Загрузка...
                </div>}

                <div className={classNames("pb-6")}>
                    <Input
                        type={'password'}
                        placeholder={'Введите новый пароль'}
                        onChange={(e) => {
                            dispatch(setNewPassword(e.target.value))
                        }}
                        name={'password'}
                        error={false}
                        value={newPassword}
                        size={'default'}
                    />
                </div>
                <div className={classNames("pb-6")}>
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={(e) => dispatch(setEmailToken(e.target.value))}
                        name={'token'}
                        value={emailToken}
                        size={'default'}
                    />
                </div>
                <Button type="primary" htmlType={'submit'} size="medium">Сохранить</Button>
            </form>

            <div className={classNames("pt-6 pb-6")}>
                <p className="text text_type_main-small text_color_inactive">
                    Вспомнили пароль?&nbsp;
                    <Link to="/login">Войти</Link>
                </p>
            </div>
        </div>
    );
}

export default ResetPassword;
