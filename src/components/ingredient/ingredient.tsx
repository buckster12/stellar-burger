import React, {FC} from "react";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientStyle from './ingredient.module.css';
import {useDrag} from "react-dnd";
import {IIngredient} from "../../types/ingredient-types";

type TIngredientProps = {
    ingredient: IIngredient;
    onClick: () => void;
    counter: number
}

const Ingredient: FC<TIngredientProps> = ({ingredient, counter, onClick}) => {
    const [, dragRef] = useDrag({
        type: 'ingredient',
        // ingredient,
        item: ingredient
    });

    return (
        ingredient && <div className={IngredientStyle.ingredientContainer} onClick={onClick}>
            {counter > 0 && <div className={IngredientStyle.counter}>
                <Counter count={counter}/>
            </div>}

            <img ref={dragRef} className={IngredientStyle.img} src={ingredient.image} alt={ingredient.name}/>
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

export default Ingredient;