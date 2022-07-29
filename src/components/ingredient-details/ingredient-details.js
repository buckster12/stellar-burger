import IngredientDetailsStyles from './ingredient-details.module.css';
import classNames from "classnames";
import PropTypes from "prop-types";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllIngredients} from "../../services/actions/ingredients-slice";

const IngredientDetails = ({noBackground = false}) => {
    let {ingredientId} = useParams();
    const dispatch = useDispatch();
    const ingredients = useSelector(state => state.ingredients.data);
    const chosenIngredient = ingredients.find(item => item._id === ingredientId);

    useEffect(() => {
        if (noBackground) {
            dispatch(getAllIngredients());
        }
    }, [dispatch, noBackground]);

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

IngredientDetails.propTypes = {
    noBackground: PropTypes.bool,
}

export default IngredientDetails;
