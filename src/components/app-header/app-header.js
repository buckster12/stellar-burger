import React from "react";
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeaderStyle from './app-header.module.css';

function AppHeader() {
    return (
        <header className={AppHeaderStyle.header}>
            <nav className={AppHeaderStyle.nav} style={{width: "1200px"}}>

                <div className="text text_type_main-small m-5" style={{display: "flex", alignContent: "center"}}>
                    <BurgerIcon type="primary"/>
                    <span className="pl-1 pt-1">Конструктор</span>
                </div>

                <div className="text text_type_main-small text_color_inactive m-5"
                     style={{display: "flex", alignContent: "center"}}>
                    <ListIcon type="secondary"/>
                    <span className="pl-1 pt-1">Лента заказов</span>
                </div>

                <div style={{flexBasis: "500px"}}>
                    <Logo/>
                </div>

                <div className="text text_type_main-small text_color_inactive m-5"
                     style={{display: "flex", alignContent: "center", marginLeft: "auto"}}>
                    <ProfileIcon type="secondary"/>
                    <span className="pl-1 pt-1">Личный кабинет</span>
                </div>

            </nav>
        </header>
    );
}

export default AppHeader;
