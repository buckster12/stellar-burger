import styles from "./feed-list-order.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IIngredient} from "../../types/ingredient-types";
import {preparedDate} from "../../utils/prepared-date";
import BorderedIngredientPreview from "../feed/bordered-ingredient-preview/bordered-ingredient-preview";
import {FC} from "react";

type TOrderProps = {
    name: string,
    date: string,
    orderNumber: number,
    ingredients: IIngredient[],
    orderStatus: string,
}

const FeedListOrder: FC<TOrderProps> = ({date, name, ingredients, orderNumber, orderStatus}) => {
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
        <div className={styles.orderContainer}>
            <div className={styles.topElements}>
                <p className="text text_type_digits-default">#{orderNumber}</p>
                <p className="text text_type_main-default text_color_inactive">
                    {preparedDate(date)}
                </p>
            </div>
            <p className="text text_type_main-medium mb-1 mt-6">{name}</p>
            <p className={`text_color_success text text_type_main-default mb-5`}>
                {orderStatus === 'done' ? 'Выполнен' : 'В процессе'}
            </p>
            <div className={styles.bottomElements}>
                <div className={styles.ingredientCirclesList}>{ingredientsLine}</div>
                <div className={styles.burgerConstructorTotal}>
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