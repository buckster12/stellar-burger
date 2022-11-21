import feedListOrderStyles from "./feed-list-order.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IIngredient} from "../../types/ingredient-types";
import {preparedDate} from "../../utils/prepared-date";
import BorderedIngredientPreview from "../feed/bordered-ingredient-preview/bordered-ingredient-preview";

type TOrderProps = {
    name: string,
    date: string,
    orderNumber: number,
    ingredients: IIngredient[],
}

const FeedListOrder = ({date, name, ingredients, orderNumber}: TOrderProps) => {
    // get all given ingredients and draw only first 5 of them,
    // then draw the number of rest ingredients in one element
    const ingredientsLine = ingredients.map((item, index) => {
        let marginLeft;
        if (index < 5) {
            marginLeft = index === 0 ? 0 : -20;
            return (
                <BorderedIngredientPreview
                    item={item}
                    key={index}
                    marginLeft={marginLeft}
                    zIndex={10 - index}
                />
            )
        } else if (index === 5) {
            return (
                <BorderedIngredientPreview
                    item={item}
                    additionalText={`+${ingredients.length - 5}`}
                    marginLeft={-20}
                    key={index}
                    zIndex={10 - index}
                    imgOpacity={0.3}
                />
            )
        }
        return null;
    });

    return (
        <div className={feedListOrderStyles.orderContainer}>
            <div className={feedListOrderStyles.topElements}>
                <p className="text text_type_digits-default">#{orderNumber}</p>
                <p className="text text_type_main-default text_color_inactive">
                    {preparedDate(date)}
                </p>
            </div>
            <p className="text text_type_main-medium mb-6 mt-6">{name}</p>
            <div className={feedListOrderStyles.bottomElements}>
                <div className={feedListOrderStyles.ingredientCirclesList}>{ingredientsLine}</div>
                <div className={feedListOrderStyles.burgerConstructorTotal}>
                    <span className="text text_type_digits-default">
                    {ingredients.reduce((totalPrice, item) => {
                        return totalPrice + item.price;
                    }, 0)}
                    </span>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </div>
    )
}

export default FeedListOrder;