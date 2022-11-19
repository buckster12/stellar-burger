import feedListOrderStyles from "./feed-list-order.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useHistory} from "react-router-dom";
import {IIngredient} from "../../types/ingredient-types";
import {intlFormatDistance} from 'date-fns';

type TOrderProps = {
    name: string,
    date: string,
    orderNumber: number,
    ingredients: IIngredient[],
}

const FeedListOrder = ({date, name, ingredients, orderNumber}: TOrderProps) => {
    const history = useHistory();
    const location = history.location.pathname;

    // function prepares readable date
    const preparedDate = (): string => {
        const dateObject = new Date(date);
        const humanWord = intlFormatDistance(
            dateObject,
            new Date(),
            {
                unit: 'day',
                locale: "ru"
            }
        );

        // add hours, minutes and timezone to date
        return humanWord.charAt(0).toUpperCase() + humanWord.slice(1) +
            ', ' + dateObject.toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'}) +
            ' i-' + dateObject.toLocaleTimeString('ru-RU', {timeZoneName: 'short'}).split(' ')[1];
    }

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
            return (
                <div
                    style={{zIndex: 10 - index, marginLeft: 50 * index}}
                    className={feedListOrderStyles.ingredientPreview} key={item._id}>
                    <img
                        src={item.image}
                        alt={item.name}
                        style={{marginLeft: -85, marginTop: -25}}
                        className={feedListOrderStyles.ingredientPreviewImg}
                    />
                </div>
            )
        } else if (index === 5) {
            return (
                <div
                    style={{
                        zIndex: 10 - index,
                        marginLeft: (50 * index),
                        border: '1px solid #fff',
                        display: "grid",
                        textAlign: "center"
                    }}
                    className={feedListOrderStyles.ingredientPreview}
                    key={item._id}>
                    <img
                        src={item.image}
                        alt={item.name}
                        style={{marginLeft: -85, marginTop: -25, opacity: 0.5, gridColumn: 1, gridRow: 1}}
                        className={feedListOrderStyles.ingredientPreviewImg}
                    />
                    <span
                        className={"text text_type_digits-default"}
                        style={{
                            gridColumn: 1,
                            gridRow: 1,
                            marginLeft: "-85px",
                            marginTop: "25px"
                        }}>+{ingredients.length - 5}</span>
                </div>
            )
        }
        return null;
    });

    return (
        <div className={feedListOrderStyles.orderContainer} onClick={() => onFeedOrderClick(orderNumber)}>
            <div className={feedListOrderStyles.topElements}>
                <p className="text text_type_digits-default">#{orderNumber}</p>
                <p className="text text_type_main-default text_color_inactive">
                    {preparedDate()}
                </p>
            </div>
            <p className="text text_type_main-medium mb-6">{name}</p>
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