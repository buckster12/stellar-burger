import IngredientDetailsStyles from './ingredient-details.module.css';
import classNames from "classnames";
import PropTypes from "prop-types";

const IngredientDetails = ({chosenIngredient}) => {

    return (
        <>
            <img src={chosenIngredient.image_large} alt={chosenIngredient.name}/>

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
        </>
    );
};

IngredientDetails.propTypes = {
    chosenIngredient: PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        image_large: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        proteins: PropTypes.number.isRequired
    }).isRequired
}

export default IngredientDetails;
