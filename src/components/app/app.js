import React, {useEffect} from 'react';
import AppStyle from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import classNames from "classnames";
import {IngredientContext} from "../context/ingredient";
import {MainBasketContext} from "../context/main-basket";
import {getAllIngredients} from "../../services/get-data";
import selectRandomIngredients from "../../services/select-random-ingredients";

function App() {
    const [mainBasket, setMainBasket] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [state, setState] = React.useState({
        isLoading: true,
        hasError: false,
    });

    useEffect(() => {
        getAllIngredients().then(data => {
                console.log(data);
                setData(data.data);
                const randomIngredients = selectRandomIngredients(data.data);
                setMainBasket(randomIngredients);
                setState({
                    ...state,
                    isLoading: false,
                });
            }
        ).catch(err => {
            setState({
                ...state,
                hasError: true,
            });
            console.log('Ошибка при загрузке данных', err);
        });
    }, []);


    return (
        <div className={AppStyle.App}>
            <div className="mt-5">
                <AppHeader/>
            </div>

            <IngredientContext.Provider value={[data, setData]}>
                <MainBasketContext.Provider value={[mainBasket, setMainBasket]}>

                    {!state.isLoading && state.hasError &&
                        <div className="text text_type_main-large">Произошла ошибка, попробуйте еще раз</div>}

                    {state.isLoading && !state.hasError &&
                        <div className={classNames(AppStyle.loadingContainer, "text text text_type_main-large")}>
                            Загрузка...
                        </div>}

                    {!state.isLoading && !state.hasError &&
                        (<div className={AppStyle.mainContent}>
                            <BurgerIngredients/>
                            <BurgerConstructor/>
                        </div>)}
                </MainBasketContext.Provider>
            </IngredientContext.Provider>
        </div>
    );
}

export default App;
