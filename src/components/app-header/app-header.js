import React from "react";
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeaderStyle from './app-header.module.css';
import classNames from "classnames";

function AppHeader() {
    return (
        <header className={AppHeaderStyle.header}>
            <nav className={AppHeaderStyle.nav}>

                <div className={classNames("text text_type_main-small m-5", AppHeaderStyle.topButton)}>
                    <BurgerIcon type="primary"/>
                    <span className="pl-1 pt-1">Конструктор</span>
                </div>

                <div
                    className={classNames("text text_type_main-small text_color_inactive m-5", AppHeaderStyle.topButton)}>
                    <ListIcon type="secondary"/>
                    <span className="pl-1 pt-1">Лента заказов</span>
                </div>

                <div className={AppHeaderStyle.logo}>
                    <Logo/>
                </div>

                <div
                    className={classNames("text text_type_main-small text_color_inactive m-5", AppHeaderStyle.topRightButton)}>
                    <ProfileIcon type="secondary"/>
                    <span className="pl-1 pt-1">Личный кабинет</span>
                </div>

            </nav>
        </header>
    );
}

export default AppHeader;
