import IngredientDetailsStyles from './ingredient-details.module.css';
import classNames from "classnames";
import PropTypes from "prop-types";

const IngredientDetails = (props) => {

    return (
        <>
            <img src={props.image_large} alt={props.name}/>

            <span className="text text_type_main-medium mt-10">{props.name}</span>

            <div className={classNames(IngredientDetailsStyles.footerRow, "mt-10")}>
                <div className={classNames('text_color_inactive', IngredientDetailsStyles.footerElement)}>
                    <span className="text text_type_main-small">Калории, ккал</span>
                    <span className="text text_type_digits-default">{props.calories}</span>
                </div>

                <div className={classNames('text_color_inactive', IngredientDetailsStyles.footerElement)}>
                    <span className="text text_type_main-small ">Белки, г</span>
                    <span className="text text_type_digits-default">{props.proteins}</span>
                </div>

                <div className={classNames('text_color_inactive', IngredientDetailsStyles.footerElement)}>
                    <span className="text text_type_main-small ">Жиры, г</span>
                    <span className="text text_type_digits-default">{props.fat}</span>
                </div>

                <div className={classNames('text_color_inactive', IngredientDetailsStyles.footerElement)}>
                    <span className="text text_type_main-small">Углеводы, г</span>
                    <span className="text text_type_digits-default">{props.carbohydrates}</span>
                </div>
            </div>
        </>
    );
};

IngredientDetails.propTypes = {
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    image_large: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired
}

export default IngredientDetails;
