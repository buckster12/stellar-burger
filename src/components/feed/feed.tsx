import React, {useEffect} from "react";
import {wsClose, wsInit} from "../../services/actions/feed-ws-slice";
import {WS_ALL_ORDERS_URL} from "../../utils/constants";
import {TOrder} from "../../types/redux";
import {Scrollbars} from "react-custom-scrollbars";
import classNames from "classnames";
import AppStyle from "../../pages/constructor/constructor.module.css";
import {NavLink, useLocation} from "react-router-dom";
import FeedListOrder from "../feed-list-order/feed-list-order";
import feedStyles from "./feed.module.css";
import {IIngredient} from "../../types/ingredient-types";
import {RootState} from "../../services/store";
import {useDispatch, useSelector} from "../../utils/hooks";

const Feed = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const {allIngredients} = useSelector((state: RootState) => ({
        allIngredients: state.ingredients.data,
    }));

    const {
        allOrders,
        totalToday,
        total,
        allOrdersStatus
    } = useSelector((state: RootState) => ({
            allOrders: state.feed.orders,
            allOrdersStatus: state.feed.status,
            totalToday: state.feed.totalToday,
            total: state.feed.total
        })
    );

    useEffect(() => {
        dispatch(wsInit(WS_ALL_ORDERS_URL));
        return () => {
            dispatch(wsClose());
        }
    }, [dispatch]);

    return (
        <>
            <div className="mb-10">
                <h1 className={classNames('text text_type_main-large', feedStyles.h1)}>Лента заказов</h1>

                <div className={feedStyles.bothSides}>
                    <div className={feedStyles.leftSide}>
                        <Scrollbars autoHeight={true} autoHeightMin={window.innerHeight - 100}>
                            {allOrders && allOrders.map((order: TOrder) => (
                                <NavLink
                                    key={order._id}
                                    to={{
                                        pathname: `/feed/${order.number}`,
                                        state: {background: location},
                                    }}
                                    style={{textDecoration: "none", color: "#fff"}}
                                >
                                    <FeedListOrder
                                        date={order.createdAt}
                                        orderStatus={order.status}
                                        ingredients={
                                            order.ingredients.map((ingredientId: string) => allIngredients.find((ingredient) => ingredient._id === ingredientId))
                                                .filter(Boolean) as IIngredient[]
                                        }
                                        name={order.name}
                                        orderNumber={order.number}
                                    />
                                </NavLink>
                            ))}
                            {(['idle', 'loading'].includes(allOrdersStatus)) && (
                                <div
                                    className={classNames(AppStyle.loadingContainer, "text text text_type_main-default")}>
                                    Загрузка...
                                </div>
                            )}
                        </Scrollbars>
                    </div>

                    <div className={classNames(feedStyles.rightSide, "ml-10", feedStyles.flexCol)}>
                        <div className={classNames(feedStyles.flexRow, "mb-15")}>
                            <div className={"mr-9"}>
                                <div className="text text_type_main-medium text_color_primary mb-6">Готовы:</div>
                                <div
                                    className={classNames(feedStyles.flexRow, "text text_type_digits-default text_color_success")}>
                                    {allOrders && allOrders.reduce((acc: Array<Array<TOrder>>, item: TOrder, index: number) => {
                                            const chunkIndex = Math.floor(index / 10);
                                            if (!acc[chunkIndex]) {
                                                acc[chunkIndex] = [];
                                            }
                                            acc[chunkIndex].push(item);
                                            return acc;
                                        }
                                        , []).map((item: TOrder[], index: number) => (
                                        <div key={index} style={{display: "flex", flexDirection: "column"}}>
                                            {item.map((item: TOrder, index: number) => (
                                                <div key={index} className={classNames("mr-2")}>
                                                    {item.number}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div className="text text_type_main-medium text_color_primary mb-6">В работе:</div>
                                <div>
                                    {allOrders && allOrders.filter((item) => item.status === "pending").map((order: TOrder) => (
                                        <div className={"text text_type_digits-default text_color_primary"}
                                             key={order._id}>
                                            {order.number}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className={classNames(feedStyles.flexCol, "mb-15")}>
                            <span className={"text text_type_main-medium"}>Выполнено за все время:</span>
                            <span className={"text text_type_digits-large"}>{total}</span>
                        </div>

                        <div className={classNames(feedStyles.flexCol)}>
                            <span className={"text text_type_main-medium"}>Выполнено за сегодня:</span>
                            <span className={"text text_type_digits-large"}>{totalToday}</span>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Feed;
