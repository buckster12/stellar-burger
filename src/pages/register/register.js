import classNames from "classnames";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory} from "react-router-dom";
import React from "react";
import {saveTokens} from "../../services/auth";
import {useDispatch, useSelector} from "react-redux";
import {setRegisterForm, register} from "../../services/actions/register-slice";
import {setIsLoggedIn} from "../../services/actions/login-slice";

const Register = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const {
        auth,
        name,
        email,
        password,
        error,
        isLoading,
    } = useSelector(state => ({
        auth: state.login.isLoggedIn,
        name: state.register.name,
        email: state.register.email,
        password: state.register.password,
        error: state.register.error,
        isLoading: state.register.isLoading,
    }));

    const onChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        dispatch(setRegisterForm({name, value}));
    }

    async function onClickFunction(e) {
        e.preventDefault();
        const data = await dispatch(register({email, password, name}));
        if (data.error) {
            dispatch(setRegisterForm({name: 'error', value: data.error}));
            return;
        }
        const accessToken = (data.payload.accessToken || '').split('Bearer ')[1];
        const refreshToken = (data.payload.refreshToken);
        saveTokens(refreshToken, accessToken);
        dispatch(setIsLoggedIn(true));
        history.push("/");
        history.replace("/");

    }

    if (auth) {
        history.replace("/");
    }

    return (
        <form onSubmit={onClickFunction}>
            <div className={classNames("pt-6 pb-6")}>
                <p className="text text_type_main-medium">Регистрация</p>
            </div>

            {error && (
                <p className="text text_type_main-default text_color_error">Что-то пошло не так</p>
            )}

            {isLoading && (
                <p className="text text_type_main-default text_color_inactive">Загрузка...</p>
            )}

            <div className={classNames("pb-6")}>
                <Input
                    placeholder={'Имя'}
                    onChange={onChange}
                    name={'name'}
                    size={'default'}
                    value={name}
                />
            </div>

            <div className={classNames("pb-6")}>
                <Input
                    type={'email'}
                    placeholder={'E-mail'}
                    onChange={onChange}
                    name={'email'}
                    value={email}
                    size={'default'}
                />
            </div>

            <div className={classNames("pb-6")}>
                <Input type={'password'}
                       placeholder={'Пароль'}
                       onChange={onChange}
                       name={'password'}
                       value={password}
                       size={'default'}
                />
            </div>

            <Button
                type="primary"
                size="medium">
                Зарегистрироваться
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

export default Register;
