import React from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {Scrollbars} from 'react-custom-scrollbars';
import Ingredient from "../ingredient/ingredient";
import IngredientsStyle from './burger-ingredients.module.css';
import IngredientList from "../ingredient-list/ingredient-list";
import classNames from "classnames";
import PropTypes from "prop-types";
import IngredientShape from "../ingredient/ingredient";

const BurgerIngredients = (props) => {
    const [current, setCurrent] = React.useState('bun')

    const ingredientsTypes = [
        {
            id: "bun",
            title: "Булки"
        }, {
            id: "sauce",
            title: "Соусы"
        }, {
            id: "main",
            title: "Начинки"
        }
    ];

    // function which count current ingredient in basket
    const countCurrentIngredient = (ingredient) => {
        let count = 0;
        props.bunBasket.forEach(item => {
                if (item._id === ingredient._id) {
                    count++;
                }
            }
        );
        props.mainBasket.forEach(item => {
                if (item._id === ingredient._id) {
                    count++;
                }
            }
        );
        return count > 0 ? count : null;
    }

    return (
        <div>
            <h1 className={classNames('text text_type_main-large', IngredientsStyle.h1)}>Соберите бургер</h1>
            <div style={{display: 'flex'}} className="pb-5">
                {ingredientsTypes.map(function (el, index) {
                    return (
                        <a href={'#' + el.id} key={index}>
                            <Tab value={el.id} active={current === el.id} onClick={setCurrent}>
                                {el.title}
                            </Tab>
                        </a>
                    )
                })}
            </div>

            <Scrollbars style={{height: "500px"}}>

                <div style={{display: "flex", flexDirection: "column", rowGap: "30pt"}} className="pr-2">

                    {ingredientsTypes.map(function (ingredientType, index) {
                        return (
                            <IngredientList key={index} id={ingredientType.id} title={ingredientType.title}>
                                {props.data
                                    .filter((el) => el.type === ingredientType.id)
                                    .map((ingredient) =>
                                        <Ingredient
                                            onClick={function () {
                                                props.addIngredient(ingredient)
                                            }}
                                            key={ingredient._id}
                                            ingredient={ingredient}
                                            counter={countCurrentIngredient(ingredient)}
                                        />
                                    )}
                            </IngredientList>
                        )
                    })}
                </div>
            </Scrollbars>
        </div>
    );
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(IngredientShape).isRequired,
    addIngredient: PropTypes.func,
    bunBasket: PropTypes.arrayOf(IngredientShape).isRequired,
    mainBasket: PropTypes.arrayOf(IngredientShape).isRequired,
}

export default BurgerIngredients;