import React from 'react';
import AppStyle from './constructor.module.css';
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import classNames from "classnames";
import {useSelector} from "react-redux";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import {IMainState} from "../../types/redux";

function App() {
    const {isLoading, hasError} = useSelector((state: IMainState) => {
        return {
            isLoading: state.ingredients.isLoading,
            hasError: state.ingredients.hasError,
            ingredients: state.ingredients.data
        }
    });

    return (
        <div className={AppStyle.App}>

            {!isLoading && hasError &&
                <div className="text text_type_main-large">Произошла ошибка, попробуйте еще раз</div>}

            {isLoading && !hasError &&
                <div className={classNames(AppStyle.loadingContainer, "text text text_type_main-large")}>
                    Загрузка...
                </div>}

            {!isLoading && !hasError &&
                (<div className={AppStyle.mainContent}>
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients/>
                        <BurgerConstructor/>
                    </DndProvider>
                </div>)}
        </div>
    );
}

export default App;
