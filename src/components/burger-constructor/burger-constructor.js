import React, {useEffect} from "react";
import {
    Button,
    ConstructorElement,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyles from './burger-constructor.module.css'
import {Scrollbars} from "react-custom-scrollbars";
import OrderDetails from "../order-details/order-details";
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {addIngredient, resetBasket, selectTotalPrice} from "../../services/actions/basket-slice";
import {useDrop} from "react-dnd";
import CartElement from "../cart-element/cart-element";
import {closeOrderModal, processOrder} from "../../services/actions/order-slice";
import Modal from "../modal/modal";
import {useHistory} from "react-router-dom";

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
    } = useSelector(state => ({
        orderId: state.order.orderId,
        isOrderProcessing: state.order.isOrderProcessing,
        isOk: state.order.isOk,
        isModalOpen: state.order.isModalOpen,
        mainBasket: state.basket,
        auth: state.login.isLoggedIn,
    }));

    const [{isHover}, dropRef] = useDrop({
            accept: 'ingredient',
            drop: (item) => {
                dispatch(addIngredient(item));
            },
            collect: monitor => ({
                isHover: monitor.isOver(),
            }),
        }
    )

    const onClickProcessOrder = () => {
        if (!auth) {
            // save basket to local storage
            // localStorage.setItem('basket', JSON.stringify(mainBasket));
            history.push('/login');
            return;
        }
        const order = {
            ingredients: [
                mainBasket.bun,
                ...mainBasket.ingredients,
                mainBasket.bun
            ]
        };
        dispatch(processOrder(order));
    }

    useEffect(() => {
        if (orderId > 0) {
            dispatch(resetBasket());
        }
    }, [dispatch, orderId]);

    return (
        <>
            <div
                className={classNames(BurgerConstructorStyles.div, "mb-10")}>

                <ul ref={dropRef}
                    className={classNames(BurgerConstructorStyles.ul, (isHover ? BurgerConstructorStyles.hoverBorder : ""))}>

                    {Object.keys(mainBasket.bun).length > 0
                        && <li className="mb-3">
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={`${mainBasket.bun.name} (верх)`}
                                price={mainBasket.bun.price}
                                thumbnail={mainBasket.bun.image}
                            />
                        </li>}

                    {mainBasket.ingredients && <div className={BurgerConstructorStyles.mainIngredients}>
                        <div className={BurgerConstructorStyles.divOverScrollbar}>
                            <Scrollbars>
                                {mainBasket.ingredients.map((ingredient, index) =>
                                    <CartElement key={ingredient.uuid} index={index} ingredient={ingredient}/>
                                )}
                            </Scrollbars>
                        </div>

                    </div>}

                    {Object.keys(mainBasket.bun).length > 0
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

                <div className={BurgerConstructorStyles.totalAmountContainer}>
                    <div className={BurgerConstructorStyles.totalPrice}>
                        <span className="text text_type_digits-medium">{totalPrice}</span>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <Button disabled={!mainBasket.bun._id} onClick={onClickProcessOrder}>Оформить заказ</Button>
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

BurgerConstructor.propTypes = {}

export default BurgerConstructor;