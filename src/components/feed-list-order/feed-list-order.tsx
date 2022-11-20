import feedListOrderStyles from "./feed-list-order.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useHistory} from "react-router-dom";
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
    const history = useHistory();
    const location = history.location.pathname;

    const onFeedOrderClick = (feedId: number): void => {
        history.push({
            pathname: '/feed/' + feedId,
            state: {background: location}
        });
    }

    // get all given ingredients and draw only first 5 of them,
    // then draw the number of rest ingredients in one element
    const ingredientsLine = ingredients.map((item, index) => {
        if (index < 5) {
            const marginLeft = index === 0 ? 0 : -20;
            return (
                <BorderedIngredientPreview
                    item={item}
                    style={{
                        zIndex: 10 - index,
                        marginLeft: `${marginLeft}`
                    }}
                />
            )
        } else if (index === 5) {
            return (
                <BorderedIngredientPreview
                    item={item}
                    additionalText={`+${ingredients.length - 5}`}
                    style={{
                        zIndex: 10 - index,
                        marginLeft: "-20",
                    }}
                    imgOpacity={0.3}
                />
            )
        }
        return null;
    });

    return (
        <div className={feedListOrderStyles.orderContainer} onClick={() => onFeedOrderClick(orderNumber)}>
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
                        return totalPrice + (item.type === 'bun' ? item.price * 2 : item.price);
                    }, 0)}
                    </span>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </div>
    )
}

export default FeedListOrder;