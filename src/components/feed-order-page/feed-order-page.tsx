import {useLocation, useParams} from "react-router-dom";
import FeedOrderPageStyles from "./feed-order-page.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {preparedDate} from "../../utils/prepared-date";
import OrderDetailsStyles from "../order-details/order-details.module.css";
import {TOrder} from "../../types/redux";
import {Scrollbars} from "react-custom-scrollbars";
import BorderedIngredientPreview from "../feed/bordered-ingredient-preview/bordered-ingredient-preview";
import classNames from "classnames";
import {FC, useEffect} from "react";
import {wsClose, wsInit} from "../../services/actions/feed-ws-slice";
import {WS_ALL_ORDERS_URL, WS_USER_ORDERS_URL} from "../../utils/constants";
import {useDispatch, useSelector} from "../../utils/hooks";
import {RootState} from "../../services/store";
import {getCookie} from "../../services/auth";

type TFeedOrderPageProps = {
    children?: never,
    modal?: boolean,
}

const FeedOrderPage: FC<TFeedOrderPageProps> = ({modal = false}) => {
    const dispatch = useDispatch();
    const location = useLocation();

    // console.log(location);

    useEffect(() => {
        if (!modal) {
            const accessToken = getCookie('accessToken');
            const url = location.pathname.includes("/profile/orders") ? WS_USER_ORDERS_URL + '?token=' + accessToken : WS_ALL_ORDERS_URL;

            dispatch(wsInit(url));
            return () => {
                dispatch(wsClose());
            }
        } else return undefined;
    }, [modal, dispatch, location.pathname]);

    // get order id from url
    const {id} = useParams<{ id: string }>();
    // find order by id in store by order.number (not id) which is integer not string
    const order = useSelector((store: RootState) => store.feed.orders.find((order: TOrder) => order.number === +id));
    const allIngredients = useSelector((state: RootState) => state.ingredients.data);
    const {error} = useSelector((state: RootState) => state.feed);

    if (error) {
        return (
            <div className={classNames(FeedOrderPageStyles.container, "text text_type_main-small")}>
                {error}
            </div>
        )
    }

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
                                <div
                                    className={classNames(FeedOrderPageStyles.textAlignLeft, "text text_type_main-default")}>
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
