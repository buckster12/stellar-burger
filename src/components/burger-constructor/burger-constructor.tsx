import React, {useEffect} from "react";
import {
    Button,
    ConstructorElement,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css'
import {Scrollbars} from "react-custom-scrollbars";
import OrderDetails from "../order-details/order-details";
import classNames from "classnames";
import {addIngredient, resetBasket, selectTotalPrice} from "../../services/actions/basket-slice";
import {useDrop} from "react-dnd";
import CartElement from "../cart-element/cart-element";
import {closeOrderModal, processOrder} from "../../services/actions/order-slice";
import Modal from "../modal/modal";
import {useHistory} from "react-router-dom";
import {IIngredient} from "../../types/ingredient-types";
import {useDispatch, useSelector} from "../../utils/hooks";
import {RootState} from "../../services/store";

const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const totalPrice = useSelector(selectTotalPrice)

    const {
        mainBasket,
        isOrderProcessing,
        orderId,
        isOk,
        isModalOpen,
        auth
    } = useSelector((state: RootState) => ({
        orderId: state.order.orderId,
        isOrderProcessing: state.order.isOrderProcessing,
        isOk: state.order.isOk,
        isModalOpen: state.order.isModalOpen,
        mainBasket: state.basket,
        auth: state.login.isLoggedIn,
    }));

    const [{isHover}, dropRef] = useDrop({
            accept: 'ingredient',
            drop: (item: IIngredient) => {
                dispatch(addIngredient(item));
            },
            collect: monitor => ({
                isHover: monitor.isOver(),
            }),
        }
    )

    const onClickProcessOrder = (): void => {
        if (!auth) {
            // save basket to local storage
            // localStorage.setItem('basket', JSON.stringify(mainBasket));
            history.push('/login');
            return;
        }
        if (!mainBasket.bun) {
            alert('Добавьте булку');
            return;
        }
        const order = [
            mainBasket.bun._id,
            ...mainBasket.ingredients.map((ingredient) => ingredient._id),
            mainBasket.bun._id
        ];
        dispatch(processOrder(order));
    }

    useEffect(() => {
        if (orderId && orderId > 0) {
            dispatch(resetBasket());
        }
    }, [dispatch, orderId]);

    return (
        <>
            <div
                className={classNames(styles.div, "mb-10")}>

                <ul ref={dropRef}
                    className={classNames(styles.ul, (isHover ? styles.hoverBorder : ""))}>

                    {mainBasket.bun && Object.keys(mainBasket.bun).length > 0
                        && <li className="mb-3">
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={`${mainBasket.bun.name} (верх)`}
                                price={mainBasket.bun.price}
                                thumbnail={mainBasket.bun.image}
                            />
                        </li>}

                    {mainBasket.ingredients && <div className={styles.mainIngredients}>
                        <div className={styles.divOverScrollbar}>
                            <Scrollbars>
                                {mainBasket.ingredients.map((ingredient, index) =>
                                    <CartElement key={ingredient.uuid} index={index} ingredient={ingredient}/>
                                )}
                            </Scrollbars>
                        </div>

                    </div>}

                    {mainBasket.bun && Object.keys(mainBasket.bun).length > 0
                        && <li className={classNames("mt-3")}>
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={`${mainBasket.bun.name} (низ)`}
                                price={mainBasket.bun.price}
                                thumbnail={mainBasket.bun.image}
                            />
                        </li>}
                </ul>

                <div className={styles.totalAmountContainer}>
                    <div className={styles.totalPrice}>
                        <span className="text text_type_digits-medium">{totalPrice}</span>
                        <CurrencyIcon type="primary"/>
                    </div>
                    {/* @ts-ignore */}
                    <Button disabled={!mainBasket.bun || !mainBasket.bun._id} onClick={onClickProcessOrder}>Оформить
                        заказ</Button>
                </div>
            </div>

            {isModalOpen &&
                <Modal onClose={() => dispatch(closeOrderModal())} title="">
                    <OrderDetails
                        orderId={orderId}
                        isLoading={isOrderProcessing}
                        isOk={isOk}
                    />
                </Modal>
            }
        </>
    )
}

export default BurgerConstructor;