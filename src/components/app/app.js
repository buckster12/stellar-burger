import React, {useEffect} from 'react';
import AppStyle from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import classNames from "classnames";

const DOMAIN_URL = 'https://norma.nomoreparties.space';

function App() {
    const [mainBasket, setMainBasket] = React.useState([]);
    const [bunBasket, setBunBasket] = React.useState(null);

    const [state, setState] = React.useState({
        isLoading: true,
        hasError: false,
        data: []
    });

    useEffect(() => {
        const getData = () => {
            fetch(DOMAIN_URL + '/api/ingredients ')
                .then(res => res.json())
                .then(data => {
                    setState({
                        ...state,
                        isLoading: false,
                        data: data.data
                    });
                    selectRandomIngredients(data.data);
                })
                .catch(err => {
                    setState({
                        ...state,
                        isLoading: false,
                        hasError: true
                    });
                    console.error(err);
                });
        };

        getData();
    }, []);

    const selectRandomIngredients = (data) => {
        // randomly add ingredients to the basket
        const mainIngredients = data.filter(item => item.type === 'main');
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

    const removeIngredient = (ingredient) => {
        setMainBasket(mainBasket.filter(item => item !== ingredient));
    }

    return (
        <>
            <div className={AppStyle.App}>

                <div className="mt-5">
                    <AppHeader/>
                </div>

                {!state.isLoading ?
                    (<div className={AppStyle.mainContent}>
                        <BurgerIngredients
                            data={state.data}
                            bunBasket={bunBasket}
                            mainBasket={mainBasket}
                        />
                        <BurgerConstructor
                            bunBasket={bunBasket}
                            mainBasket={mainBasket}
                            removeIngredient={removeIngredient}
                        />
                    </div>)
                    :
                    (<div className={classNames(AppStyle.loadingContainer, "text text text_type_main-large")}>
                        Загрузка...
                    </div>)
                }
            </div>
            <div id="react-modals"></div>
        </>
    );
}

export default App;
