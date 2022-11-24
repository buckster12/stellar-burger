import React from 'react';
import styles from './constructor.module.css';
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import classNames from "classnames";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import {useSelector} from "../../utils/hooks";
import {RootState} from "../../services/store";

function App() {
    const {isLoading, hasError} = useSelector((state: RootState) => {
        return {
            isLoading: state.ingredients.isLoading,
            hasError: state.ingredients.hasError,
            ingredients: state.ingredients.data
        }
    });

    return (
        <div className={styles.App}>

            {!isLoading && hasError &&
                <div className="text text_type_main-large">Произошла ошибка, попробуйте еще раз</div>}

            {isLoading && !hasError &&
                <div className={classNames(styles.loadingContainer, "text text text_type_main-large")}>
                    Загрузка...
                </div>}

            {!isLoading && !hasError &&
                (<div className={styles.mainContent}>
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients/>
                        <BurgerConstructor/>
                    </DndProvider>
                </div>)}
        </div>
    );
}

export default App;
