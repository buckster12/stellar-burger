import IngredientDetailsStyles from './ingredient-details.module.css';
import classNames from "classnames";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {IIngredient, IIngredientsArray} from "../../types/ingredient-types";
import {IMainState} from "../../types/redux";
import React from "react";

const IngredientDetails = () => {
    let ingredientId: string = useParams<{ ingredientId: string }>().ingredientId;
    const ingredients: IIngredientsArray = useSelector((state: IMainState) => state.ingredients.data);
    const chosenIngredient: IIngredient | undefined = ingredients.find((item: IIngredient) => item._id === ingredientId);

    if (!chosenIngredient) {
        return <span className="text_type_main-default text_color_inactive">Loading...</span>;
    }

    return (
        <div className={IngredientDetailsStyles.modalContentContainer}>
            <div>
                <img src={chosenIngredient.image_large} alt={chosenIngredient.name}/>
            </div>

            <span className="text text_type_main-medium mt-10">{chosenIngredient.name}</span>

            <div className={classNames(IngredientDetailsStyles.footerRow, "mt-10")}>
                <div className={classNames('text_color_inactive', IngredientDetailsStyles.footerElement)}>
                    <span className="text text_type_main-small">Калории, ккал</span>
                    <span className="text text_type_digits-default">{chosenIngredient.calories}</span>
                </div>

                <div className={classNames('text_color_inactive', IngredientDetailsStyles.footerElement)}>
                    <span className="text text_type_main-small ">Белки, г</span>
                    <span className="text text_type_digits-default">{chosenIngredient.proteins}</span>
                </div>

                <div className={classNames('text_color_inactive', IngredientDetailsStyles.footerElement)}>
                    <span className="text text_type_main-small ">Жиры, г</span>
                    <span className="text text_type_digits-default">{chosenIngredient.fat}</span>
                </div>

                <div className={classNames('text_color_inactive', IngredientDetailsStyles.footerElement)}>
                    <span className="text text_type_main-small">Углеводы, г</span>
                    <span className="text text_type_digits-default">{chosenIngredient.carbohydrates}</span>
                </div>
            </div>
        </div>
    );
};

export default IngredientDetails;
