import React from "react";
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeaderStyle from './app-header.module.css';
import classNames from "classnames";
import {Link, NavLink, useLocation} from "react-router-dom";

function AppHeader() {
    const location = useLocation();
    const constructorIconClass = location.pathname === '/' ? 'primary' : 'secondary';
    const feedIconClass = location.pathname === '/feed' ? 'primary' : 'secondary';

    const ProfileIconClass = () => {
        if (
            location.pathname.includes('/profile') ||
            location.pathname === '/login'
        ) {
            return 'primary';
        } else {
            return 'secondary';
        }
    }

    const ProfileTextClass = () => {
        if (
            location.pathname.includes('/profile') ||
            location.pathname === '/login'
        ) {
            return 'text_color_primary';
        } else {
            return 'text_color_inactive';
        }
    }

    return (
        <header className={AppHeaderStyle.header}>
            <nav className={AppHeaderStyle.nav}>
                <div
                    className={classNames("text text_type_main-small m-5", AppHeaderStyle.topButton)}>
                    <BurgerIcon type={constructorIconClass}/>
                    <NavLink to="/" exact={true}
                             activeClassName="text_color_primary">
                        <span className="pl-1 pt-1">Конструктор</span>
                    </NavLink>
                </div>

                <div
                    className={classNames("text text_type_main-small text_color_inactive m-5", AppHeaderStyle.topButton)}>
                    <ListIcon type={feedIconClass}/>
                    <NavLink to="/feed" exact={true}
                             activeClassName="text_color_primary">
                        <span className="pl-1 pt-1">Лента заказов</span>
                    </NavLink>
                </div>

                <div className={AppHeaderStyle.logo}>
                    <Link to={`/`}>
                        <Logo/>
                    </Link>
                </div>

                <div
                    className={classNames("text text_type_main-small m-5", AppHeaderStyle.topRightButton)}>
                    <ProfileIcon type={ProfileIconClass()}/>
                    <NavLink to="/profile" className={ProfileTextClass()}>
                        <span className="pl-1 pt-1">Личный кабинет</span>
                    </NavLink>
                </div>

            </nav>
        </header>
    );
}

export default AppHeader;
