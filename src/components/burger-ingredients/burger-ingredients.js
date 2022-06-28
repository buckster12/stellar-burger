import React, {useState} from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {Scrollbars} from 'react-custom-scrollbars';
import Ingredient from "../ingredient/ingredient";
import BurgerIngredientsStyle from './burger-ingredients.module.css';
import IngredientList from "../ingredient-list/ingredient-list";
import classNames from "classnames";
import PropTypes from "prop-types";
import IngredientDetails from "../ingredient-details/ingredient-details";
import ingredientType from "../../utils/types";
import IngredientProptypes from "../../utils/proptypes/ingredient-proptypes";
import Modal from "../modal/modal";

const BurgerIngredients = ({data, ...props}) => {
    const [currentTab, setCurrentTab] = React.useState('bun')

    // Modal window vars
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({});

    const showModal = (ingredient) => {
        setModalContent({
            image_large: ingredient.image_large,
            name: ingredient.name,
            proteins: ingredient.proteins,
            fat: ingredient.fat,
            carbohydrates: ingredient.carbohydrates,
            calories: ingredient.calories,
        })
        setIsModalOpen(true);
    }
    const hideModal = () => {
        setIsModalOpen(false);
    }

    // function which count current ingredient in basket
    const countCurrentIngredient = (ingredient) => {
        let count = 0;
        // add 2 because of top and bottom buns
        if (props.bunBasket !== 'undefined' && ingredient._id === props.bunBasket._id) {
            count = count + 2;
        }

        props.mainBasket.forEach(item => {
                if (item._id === ingredient._id) {
                    count++;
                }
            }
        );
        return count;
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
                <Scrollbars>
                    <div className={classNames(BurgerIngredientsStyle.ingredientBlock, "pr-2")}>
                        {ingredientType.map(function (type, index) {
                            return (
                                <IngredientList key={index} id={type.id} title={type.title}>
                                    {data
                                        .filter((x) => x.type === type.id)
                                        .map((mapIngredient, index) => {
                                                return (
                                                    <Ingredient
                                                        onClick={() => {
                                                            showModal(mapIngredient)
                                                        }}
                                                        key={mapIngredient._id ?? index}
                                                        ingredient={mapIngredient}
                                                        counter={countCurrentIngredient(mapIngredient)}
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
                <Modal onClose={hideModal} title="Детали ингредиента">
                    <IngredientDetails chosenIngredient={modalContent}/>
                </Modal>
            }
        </div>
    );
}

BurgerIngredients.propTypes = {
    bunBasket: IngredientProptypes.isRequired,
    data: PropTypes.arrayOf(IngredientProptypes).isRequired,
    mainBasket: PropTypes.arrayOf(IngredientProptypes).isRequired
}

export default BurgerIngredients;