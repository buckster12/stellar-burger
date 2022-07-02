import React, {useEffect} from 'react';
import AppStyle from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import classNames from "classnames";
import {IngredientContext} from "../../utils/context/ingredient";
import {BunBasketContext} from "../../utils/context/bun-basket";
import {MainBasketContext} from "../../utils/context/main-basket";

const DOMAIN_URL = 'https://norma.nomoreparties.space';

function App() {
    const [mainBasket, setMainBasket] = React.useState([]);
    const [bunBasket, setBunBasket] = React.useState(null);
    const [data, setData] = React.useState([]);

    const [state, setState] = React.useState({
        isLoading: true,
        hasError: false,
    });

    useEffect(() => {
        const getData = () => {
            fetch(DOMAIN_URL + '/api/ingredients')
                .then(response => {
                    if (response.ok) return response.json();
                    return Promise.reject(`Ошибка ${response.status}`);
                })
                .then(data => {
                    setState({
                        ...state,
                        isLoading: false,
                    });
                    setData(data.data);
                    selectRandomIngredients(data.data);
                })
                .catch(err => {
                    setState({
                        ...state,
                        isLoading: false,
                        hasError: true
                    });
                    console.log('Ошибка при загрузке данных', err);
                    // console.error(err);
                });
        };

        getData();
    }, []);

    const selectRandomIngredients = (data) => {
        // randomly add ingredients to the basket
        const mainIngredients = data.filter(item => item.type === 'main' || item.type === 'sauce');
        let mainBasketRandom = [];
        for (let i = 0; i < 10; i++) {
            const random = Math.floor(Math.random() * mainIngredients.length);
            const ingredient = mainIngredients[random];
            mainBasketRandom.push(ingredient);
        }
        setMainBasket(mainBasketRandom);

        // randomly add bun to the basket
        const bunIngredients = data.filter(item => item.type === 'bun');
        const random = Math.floor(Math.random() * bunIngredients.length);
        const bunIngredient = bunIngredients[random];
        setBunBasket(bunIngredient);
    }

    return (
        <div className={AppStyle.App}>
            <div className="mt-5">
                <AppHeader/>
            </div>

            <IngredientContext.Provider value={[data, setData]}>
                <BunBasketContext.Provider value={[bunBasket, setBunBasket]}>
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
                </BunBasketContext.Provider>
            </IngredientContext.Provider>
        </div>
    );
}

export default App;
