import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {ChangeEvent, FormEvent} from "react";
import classNames from "classnames";
import {Link, Redirect, useLocation} from "react-router-dom";
import {login, setError, setField, setPasswordVisible} from "../../services/actions/login-slice";
import styles from "./login.module.css";
import {ILocationState} from "../../types/types";
import {useDispatch, useSelector} from "../../utils/hooks";

const Login = () => {
    const dispatch = useDispatch();
    const location = useLocation<ILocationState>();

    const {
        isLoggedIn,
        isLoading,
        email,
        password,
        passwordVisible,
        error
    } = useSelector((state) => ({
        isLoading: state.login.isLoading,
        email: state.login.email,
        password: state.login.password,
        passwordVisible: state.login.passwordVisible,
        error: state.login.error,
        isLoggedIn: state.login.isLoggedIn,
    }));


    const onClickLogin = async (e: FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            dispatch(setError("Заполните все поля"));
            return;
        }
        dispatch(login({email, password}));
    }

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        dispatch(setField({
            value: e.target.value,
            name: e.target.name,
        }));
    }

    if (isLoggedIn) {
        const redirectTo = location?.state?.from || "/";
        return <Redirect to={redirectTo}/>
    }

    return (
        <div className={styles.centeredForm}>
            <form onSubmit={onClickLogin}>
                <div className="pt-6 pb-6">
                    <p className="text text_type_main-medium">Вход</p>
                </div>

                {isLoading && <p className={'text_type_main-small text'}>
                    Загрузка...
                </p>}

                {location.state && location.state.passwordReset && (
                    <p className={'text text_type_main-small mb-5 text_color_success'}>
                        Пароль был успешно изменен.
                    </p>
                )}

                {error && (<p className={'text text_type_main-small mb-5 text_color_error'}>
                    Ошибка входа. Проверьте правильность введенных данных.
                </p>)}

                <div className={classNames("pb-6", styles.input)}>
                    <Input
                        type={'email'}
                        placeholder={'E-mail'}
                        onChange={onChange}
                        name={'email'}
                        value={email}
                        size={'default'}
                    />
                </div>

                <div className={classNames("pb-6", styles.input)}>
                    <Input
                        type={passwordVisible ? 'text' : 'password'}
                        value={password}
                        error={false}
                        onChange={onChange}
                        name={'password'}
                        placeholder={'Пароль'}
                        onIconClick={() => dispatch(setPasswordVisible(!passwordVisible))}
                        icon={passwordVisible ? 'HideIcon' : 'ShowIcon'}
                    />
                </div>

                {/* @ts-ignore */}
                <Button type="primary" size="medium">Войти</Button>

                <div className={classNames("pt-6 pb-6")}>
                    <p className="text text_type_main-small text_color_inactive">
                        Вы — новый пользователь?&nbsp;
                        <Link to="/register">Зарегистрироваться</Link>
                    </p>
                </div>
                <div className={classNames("pb-6")}>
                    <p className="text text_type_main-small text_color_inactive">
                        Забыли пароль?&nbsp;
                        <Link to="/forgot-password">Восстановить пароль</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login;
