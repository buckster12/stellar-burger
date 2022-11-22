import {useParams} from "react-router-dom";
import FeedOrderPageStyles from "./feed-order-page.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {preparedDate} from "../../utils/prepared-date";
import OrderDetailsStyles from "../order-details/order-details.module.css";
import {IMainState, TOrder} from "../../types/redux";
import {Scrollbars} from "react-custom-scrollbars";
import BorderedIngredientPreview from "../feed/bordered-ingredient-preview/bordered-ingredient-preview";
import classNames from "classnames";
import {FC, useEffect} from "react";
import {wsClose, wsInit} from "../../services/actions/feed-ws-slice";
import {WS_ALL_ORDERS_URL} from "../../utils/constants";

type TFeedOrderPageProps = {
    children?: never,
    modal?: boolean,
}

const FeedOrderPage: FC<TFeedOrderPageProps> = ({modal = false}) => {
    const dispatch = useDispatch<any>();

    useEffect(() => {
        if (!modal) {
            // load orders from ws
            dispatch(wsInit(WS_ALL_ORDERS_URL));
            return () => dispatch(wsClose());
        } else return () => {
        };
    }, [modal, dispatch]);

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
            {!modal &&
                <p className={classNames(FeedOrderPageStyles.alignSelfCenter, "text text_type_digits-default mt-10")}>#{order.number}</p>
            }
            <p className="text text_type_main-medium mt-10 mb-3">{order.name}</p>
            <p className={`text_color_success text text_type_main-default`}>
                {order.status === 'done' ? 'Выполнен' : 'В процессе'}
            </p>
            <p className="text text_type_main-medium mt-10 mb-6">Состав:</p>

            <Scrollbars autoHeight={true} width="100%" autoHeightMin={100}>
                {
                    Array.from(new Set(order.ingredients)).map((ingredientId: string, index: number) => {
                        const currentIngredient = allIngredients.find((ingredient) => ingredient._id === ingredientId);
                        if (!currentIngredient) {
                            return null;
                        }
                        return currentIngredient && (
                            <div className={classNames(FeedOrderPageStyles.ingredientElement, 'pr-6')} key={index}>
                                <BorderedIngredientPreview
                                    item={currentIngredient}
                                    className={FeedOrderPageStyles.ingredientImage}
                                />
                                <div className="text text_type_main-default" style={{textAlign: 'left'}}>
                                    {currentIngredient.name}
                                </div>
                                <div
                                    className={classNames(FeedOrderPageStyles.ingredientPrice)}>
                                    <span className={"text text_type_digits-default"}>
                                        {order.ingredients.filter((id: string) => id === ingredientId).length}
                                        x {currentIngredient.price}
                                    </span>
                                    <CurrencyIcon type="primary"/>
                                </div>
                            </div>
                        );
                    })}
            </Scrollbars>

            <div className={`${FeedOrderPageStyles.bottomElements} mt-5`}>
                <p className="text text_type_main-default text_color_inactive">
                    {preparedDate(order.createdAt)}
                </p>
                <div className={FeedOrderPageStyles.ingredientPrice}>
                    <span className={`text text_type_digits-default`}>
                    {order.ingredients.reduce((acc, ingredientId) => {
                        const currentIngredient = allIngredients.find((ingredient) => ingredient._id === ingredientId);
                        if (!currentIngredient) {
                            return acc;
                        }
                        return acc + currentIngredient.price;
                    }, 0)}
                    </span>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </div>
    )
}

export default FeedOrderPage;
