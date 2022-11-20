import {useParams} from "react-router-dom";
import FeedOrderPageStyles from "./feed-order-page.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";
import {preparedDate} from "../../utils/prepared-date";
import OrderDetailsStyles from "../order-details/order-details.module.css";
import {IMainState, TOrder} from "../../types/redux";
import {Scrollbars} from "react-custom-scrollbars";
import BorderedIngredientPreview from "../feed/bordered-ingredient-preview/bordered-ingredient-preview";
import classNames from "classnames";

const FeedOrderPage = () => {
    // get order id from url
    const {id} = useParams<{ id: string }>();
    const order = useSelector(
        (state: IMainState) => state.feed.orders.find((order: TOrder) => order.number.toString() === id)
    );
    const allIngredients = useSelector((state: IMainState) => state.ingredients.data);

    if (!order) {
        return (
            <div className={OrderDetailsStyles.textCenter}>
                <div className="text text_type_main-medium">
                    Загрузка...
                </div>
            </div>
        )
    }

    return (
        <div className={FeedOrderPageStyles.orderWrapper}>
            <p className="text text_type_main-medium mt-10 mb-3">{order.name}</p>
            <p className={`text_color_success text text_type_main-default`}>
                {order.status === 'done' ? 'Выполнен' : 'В процессе'}
            </p>
            <p className="text text_type_main-medium mt-10 mb-6">Состав:</p>

            <Scrollbars autoHeight={true} width="100%" autoHeightMin={300}>
                {
                    Array.from(new Set(order.ingredients)).map((ingredientId: string, index: number) => {
                    const currentIngredient = allIngredients.find((ingredient) => ingredient._id === ingredientId);
                    if (!currentIngredient) {
                        return null;
                    }
                    return currentIngredient && (
                        <div className={FeedOrderPageStyles.ingredientElement} key={index}>
                            <BorderedIngredientPreview
                                item={currentIngredient}
                                className={FeedOrderPageStyles.ingredientImage}
                            />
                            <div className="text text_type_main-default" style={{textAlign: 'left'}}>
                                {currentIngredient.name}
                            </div>
                            <div className={classNames(FeedOrderPageStyles.flexRight, "text text_type_digits-default")}>
                                {order.ingredients.filter((id: string) => id === ingredientId).length}
                                x {currentIngredient.price}
                                <CurrencyIcon type="primary"/>
                            </div>
                        </div>
                    );
                })}
            </Scrollbars>
            <div className={`${FeedOrderPageStyles.footer} mt-10`}>
                <p className="text text_type_main-default text_color_inactive">
                    {preparedDate(order.createdAt)}
                </p>
                <div className={`text text_type_digits-default flex ${FeedOrderPageStyles.totalPrice}`}>
                    {order.ingredients.reduce((acc, ingredientId) => {
                        const currentIngredient = allIngredients.find((ingredient) => ingredient._id === ingredientId);
                        if (!currentIngredient) {
                            return acc;
                        }
                        const addPrice = currentIngredient.type === 'bun' ? currentIngredient.price * 2 : currentIngredient.price;
                        return acc + addPrice;
                    }, 0)}
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </div>
    )
}

export default FeedOrderPage;
