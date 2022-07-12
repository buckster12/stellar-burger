import React, {useEffect} from 'react';
import AppStyle from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {getAllIngredients} from "../../services/actions/ingredients-slice";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

function App() {
    const dispatch = useDispatch();
    const {isLoading, hasError} = useSelector(state => {
        return {
            isLoading: state.ingredients.isLoading,
            hasError: state.ingredients.hasError,
        }
    })

    useEffect(() => {
        dispatch(getAllIngredients());
    }, [dispatch]);


    return (
        <div className={AppStyle.App}>
            <div className="mt-5">
                <AppHeader/>
            </div>

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
