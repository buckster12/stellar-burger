import React from "react";
import PropTypes from 'prop-types';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientStyle from './ingredient.module.css';

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

const IngredientShape = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image_large: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
});

Ingredient.propTypes = {
    ingredient: IngredientShape.isRequired,
    counter: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default Ingredient;