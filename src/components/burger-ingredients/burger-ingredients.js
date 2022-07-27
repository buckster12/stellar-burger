import React from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {Scrollbars} from 'react-custom-scrollbars';
import BurgerIngredientsStyle from './burger-ingredients.module.css';
import IngredientList from "../ingredient-list/ingredient-list";
import classNames from "classnames";
import IngredientDetails from "../ingredient-details/ingredient-details";
import ingredientType from "../../utils/types";
import Modal from "../modal/modal";
import Ingredient from "../ingredient/ingredient";
import {useDispatch, useSelector} from "react-redux";
import {hideModal} from "../../services/actions/modal-slice";
import {useHistory, useLocation} from "react-router-dom";

const BurgerIngredients = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const [currentTab, setCurrentTab] = React.useState('bun')
    const {mainBasket, bunBasket, data} = useSelector(state => ({
        mainBasket: state.basket.ingredients,
        bunBasket: state.basket.bun,
        data: state.ingredients.data
    }));

    // Modal window vars
    const modalContent = useSelector(state => state.modal.modalContent);
    const isModalOpen = useSelector(state => state.modal.isModalOpen);

    // function which count current ingredient in basket
    const countCurrentIngredient = (ingredient) => {
        let count = 0;
        if (ingredient.type === 'bun' && bunBasket._id === ingredient._id) {
            return 2;
        }
        mainBasket.forEach(item => {
                if (item._id === ingredient._id) {
                    count++;
                }
            }
        );
        return count;
    }

    const handleScroll = (e) => {
        const bunSection = document.getElementById('section-bun').scrollHeight;
        const sauceSection = document.getElementById('section-sauce').scrollHeight;

        if (e.target.scrollTop < bunSection) {
            setCurrentTab('bun');
        }
        if (e.target.scrollTop >= bunSection) {
            setCurrentTab('sauce');
        }
        if (e.target.scrollTop >= bunSection + sauceSection) {
            setCurrentTab('main');
        }
    }

    return (
        <div className="mb-10">
            <h1 className={classNames('text text_type_main-large', BurgerIngredientsStyle.h1)}>Соберите бургер</h1>
            <div className={classNames(BurgerIngredientsStyle.tabs, "pb-5")}>
                {ingredientType.map(function (el, index) {
                    return (
                        <a href={'#' + el.id} key={index}>
                            <Tab value={el.id} active={currentTab === el.id} onClick={setCurrentTab}>
                                {el.title}
                            </Tab>
                        </a>
                    )
                })}
            </div>

            <div className={BurgerIngredientsStyle.scrollContainer}>
                <Scrollbars onScroll={handleScroll}>
                    <div className={classNames(BurgerIngredientsStyle.ingredientBlock, "pr-2")}>
                        {ingredientType.map(function (type, index) {
                            return (
                                <IngredientList key={index} id={type.id} title={type.title}>
                                    {data
                                        .filter((x) => x.type === type.id)
                                        .map((mapIngredient, index) => {
                                                return (
                                                    <Ingredient
                                                        key={mapIngredient._id ?? index}
                                                        ingredient={mapIngredient}
                                                        counter={countCurrentIngredient(mapIngredient)}
                                                        onClick={() => {
                                                            history.push('/');
                                                            history.replace({
                                                                pathname: '/ingredients/' + mapIngredient._id,
                                                                state: {
                                                                    background: location,
                                                                }
                                                            });
                                                        }}
                                                    />
                                                )
                                            }
                                        )}
                                </IngredientList>
                            )
                        })}
                    </div>
                </Scrollbars>
            </div>

            {isModalOpen &&
                <Modal onClose={() => dispatch(hideModal())} title="Детали ингредиента">
                    <IngredientDetails chosenIngredient={modalContent}/>
                </Modal>
            }
        </div>
    );
}

BurgerIngredients.propTypes = {}

export default BurgerIngredients;