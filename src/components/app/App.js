import React, {useEffect} from 'react';
import './App.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

const DOMAIN_URL = 'https://norma.nomoreparties.space';
// const DOMAIN_URL = 'https://norma.nomoreparties.space111'; // error

function App() {
    const [basket, setBasket] = React.useState({
        bun: [],
        main: []
    });

    const [data, setData] = React.useState([]);

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(DOMAIN_URL + '/api/ingredients ');
            const fetchedJsonData = await res.json();
            if (fetchedJsonData.success) {
                setData(fetchedJsonData.data);
            }
        }
        try {
            getData();
        } catch (e) {
            console.log(e);
        }
    }, []);


    const addIngredient = (ingredient) => {
        setBasket({
            ...basket,
            main: [...basket.main, ingredient]
        });
    }

    const removeIngredient = (ingredient) => {
        setBasket(basket.filter(item => item !== ingredient));
    }

    return (
        <div className="App" style={{display: "flex", flexDirection: "column"}}>

            <div className="mt-5">
                <AppHeader/>
            </div>

            <div style={{display: "flex", justifyContent: "center"}}>
                <BurgerIngredients
                    data={data}
                    bunBasket={basket.bun}
                    mainBasket={basket.main}
                    addIngredient={addIngredient}
                />
                <BurgerConstructor
                    bunBasket={basket.bun}
                    mainBasket={basket.main}
                    removeIngredient={removeIngredient}
                />
            </div>
        </div>
    );
}

export default App;
