import React from "react";
import PropTypes from 'prop-types';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientStyle from './ingredient.module.css';
import IngredientProptypes from "../../utils/proptypes/ingredient-proptypes";

const Ingredient = ({ingredient, counter, onClick}) => {
    return (
        ingredient && <div className={IngredientStyle.ingredientContainer} onClick={onClick}>
            {counter > 0 && <div className={IngredientStyle.counter}>
                <Counter count={counter}/>
            </div>}

            <img className={IngredientStyle.img} src={ingredient.image} alt={ingredient.name}/>
            <div className={IngredientStyle.priceContainer}>
                <span className="text text_type_digits-default pr-2">{ingredient.price}</span>
                <CurrencyIcon type="primary"/>
            </div>
            <p className="text text_type_main-default">
                {ingredient.name}
            </p>
        </div>
    )
}

Ingredient.propTypes = {
    ingredient: IngredientProptypes.isRequired,
    counter: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default Ingredient;