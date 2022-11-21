import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {wsClose, wsInit} from "../../services/actions/feed-ws-slice";
import {WS_ALL_ORDERS_URL} from "../../utils/constants";
import {IMainState, TOrder} from "../../types/redux";
import {Scrollbars} from "react-custom-scrollbars";
import classNames from "classnames";
import AppStyle from "../../pages/constructor/constructor.module.css";
import {NavLink, useLocation} from "react-router-dom";
import FeedListOrder from "../feed-list-order/feed-list-order";
import feedStyles from "./feed.module.css";
import {IIngredient} from "../../types/ingredient-types";

const Feed = () => {
    const dispatch = useDispatch<any>();
    const location = useLocation();
    const {allIngredients} = useSelector((state: IMainState) => ({
        allIngredients: state.ingredients.data,
    }));

    const {
        allOrders,
        totalToday,
        total,
        allOrdersStatus
    } = useSelector((state: IMainState) => ({
            allOrders: state.feed.orders,
            allOrdersStatus: state.feed.status,
            totalToday: state.feed.totalToday,
            total: state.feed.total
        })
    );

    useEffect(() => {
        dispatch(wsInit(WS_ALL_ORDERS_URL));
        return () => dispatch(wsClose());
    }, [dispatch]);

    return (
        <>
            <div className="mb-10">
                <h1 className={classNames('text text_type_main-large', feedStyles.h1)}>Лента заказов</h1>

                <div style={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between"}}>
                    <div>
                        <Scrollbars autoHeight={true} width={600} autoHeightMin={500}>
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
                                                .filter((item) => item !== undefined) as IIngredient[]
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
                        <div className={classNames(feedStyles.flexRow, feedStyles.flexBetween)}>
                            <div>
                                <span className="text text_type_main-small text_color_primary">Готовы:</span><br/>
                                <div
                                    className={classNames(feedStyles.flexRow, "text text_type_main-small text_color_success")}>
                                    {allOrders && allOrders.reduce((acc: any, item: any, index: number) => {
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
                                <span className="text text_type_main-small text_color_primary">В работе:</span><br/>
                                <div>
                                    {allOrders && allOrders.filter((item) => item.status === "pending").map((order: TOrder) => (
                                        <div key={order._id}>
                                            {order.number}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className={feedStyles.flexCol}>
                            <span className={"text text_type_main-small"}>Выполнено за все время:</span>
                            <span className={"text text_type_digits-large"}>{total}</span>
                        </div>

                        <div className={feedStyles.flexCol}>
                            <span className={"text text_type_main-small"}>Выполнено за сегодня:</span>
                            <span className={"text text_type_digits-large"}>{totalToday}</span>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Feed;
