import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {wsClose, wsInit} from "../../services/actions/feed-ws-slice";
import {WS_USER_ORDERS_URL} from "../../utils/constants";
import {IMainState, TOrder} from "../../types/redux";
import {NavLink, useLocation} from "react-router-dom";
import FeedListOrder from "../../components/feed-list-order/feed-list-order";
import {IIngredient} from "../../types/ingredient-types";
import classNames from "classnames";
import AppStyle from "../constructor/constructor.module.css";
import {Scrollbars} from "react-custom-scrollbars";
import {getCookie} from "../../services/auth";

const Orders = () => {
    const dispatch = useDispatch<any>();
    const allIngredients = useSelector((state: IMainState) => state.ingredients.data);

    const {
        allOrders,
        allOrdersStatus
    } = useSelector((state: IMainState) => ({
            allOrders: state.feed.orders,
            allOrdersStatus: state.feed.status,
        })
    );

    const location = useLocation();

    useEffect(() => {
        dispatch(wsInit(WS_USER_ORDERS_URL + `?token=${getCookie('accessToken')}`));
        return () => {
            dispatch(wsClose());
        }
    }, [dispatch]);

    return (
        <div style={{width: "auto"}}>
            <Scrollbars autoHeight={true} width={"100%"} autoHeightMin={500}>
                {allOrders && allOrders.map((order: TOrder) => (
                    <NavLink
                        key={order._id}
                        to={{
                            pathname: `/profile/orders/${order.number}`,
                            state: {background: location},
                        }}
                        style={{textDecoration: "none", color: "#fff"}}
                    >
                        <FeedListOrder
                            orderStatus={order.status}
                            date={order.createdAt}
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
    );
}

export default Orders;
