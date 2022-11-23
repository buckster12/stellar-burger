import React, {useEffect} from "react";
import {wsClose, wsInit} from "../../services/actions/feed-ws-slice";
import {WS_USER_ORDERS_URL} from "../../utils/constants";
import {TOrder} from "../../types/redux";
import {NavLink, useLocation} from "react-router-dom";
import FeedListOrder from "../../components/feed-list-order/feed-list-order";
import {IIngredient} from "../../types/ingredient-types";
import classNames from "classnames";
import AppStyle from "../constructor/constructor.module.css";
import {Scrollbars} from "react-custom-scrollbars";
import {getCookie} from "../../services/auth";
import {useDispatch, useSelector} from "../../utils/hooks";
import {RootState} from "../../services/store";
import styles from "./profile.module.css";

const Orders = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(wsInit(WS_USER_ORDERS_URL + `?token=${getCookie('accessToken')}`));
        return () => {
            dispatch(wsClose());
        }
    }, [dispatch]);

    const {
        allOrders,
        allOrdersStatus,
        allIngredients
    } = useSelector((state: RootState) => ({
            allOrders: state.feed.orders,
            allOrdersStatus: state.feed.status,
            allIngredients: state.ingredients.data
        })
    );

    return (
        <div className={styles.ordersContainer}>
            <Scrollbars autoHeight={true} width={"100%"} autoHeightMin={500}>
                {allOrders && allOrders.map((order: TOrder) => (
                    <NavLink
                        key={order._id}
                        to={{
                            pathname: `/profile/orders/${order.number}`,
                            state: {background: location},
                        }}
                        className={styles.orderNavLink}
                    >
                        <FeedListOrder
                            orderStatus={order.status}
                            date={order.createdAt}
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
    );
}

export default Orders;
