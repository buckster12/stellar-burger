import React, {useEffect} from "react";
import {
    Button,
    ConstructorElement,
    CurrencyIcon,
    DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyles from './burger-constructor.module.css'
import {Scrollbars} from "react-custom-scrollbars";
import OrderDetails from "../order-details/order-details";
import classNames from "classnames";
import {MainBasketContext} from "../../utils/context/main-basket";
import {BunBasketContext} from "../../utils/context/bun-basket";

const ORDER_URL = 'https://norma.nomoreparties.space/api/orders';

function reducer(state, action) {
    switch (action.type) {
        case 'addToBasket':
            return {
                ...state,
                totalPrice: state.totalPrice + action.payload.price
            };
        case 'addBunToBasket':
            return {
                ...state,
                totalPrice: state.totalPrice + 2 * action.payload.price
            };
        case 'resetBasket':
            return {
                totalPrice: 0,
            }
        default:
            return state;
    }
}

const BurgerConstructor = () => {
    const [isOrderDetailsOpen, setIsOrderDetailsOpen] = React.useState(false);

    const closeOrderModal = () => {
        setIsOrderDetailsOpen(false);
    }
    const [orderId, setOrderId] = React.useState(0);
    const [isOrderProcessing, setIsOrderProcessing] = React.useState(false);
    const [isOk, setIsOk] = React.useState(false);
    const [totalPrice, totalPriceDispatch] = React.useReducer(reducer, {products: [], totalPrice: 0}, undefined);

    const processOrder = () => {
        setIsOrderDetailsOpen(true);
        setIsOrderProcessing(true);

        fetch(ORDER_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                ingredients: [
                    // get only _id of ingredients
                    ...mainBasket.map(item => item._id),
                    bunBasket._id
                ]
            })
        })
            .then(response => {
                if (response.ok) return response.json();
                return Promise.reject(`Ошибка ${response.status}`);
            }).then(data => {
                
            if (data.success) {
                setOrderId(data.order.number);
                setIsOk(true);
            } else setIsOk(false);

        }).catch(err => {
            console.log('Ошибка при загрузке данных', err);
            // console.error(err);
        }).finally(() => {
                setIsOrderProcessing(false);
            }
        );
    }

    const [mainBasket, setMainBasket] = React.useContext(MainBasketContext);
    const [bunBasket] = React.useContext(BunBasketContext);

    useEffect(() => {
        totalPriceDispatch({type: 'resetBasket'});

        mainBasket.forEach(item => {
            totalPriceDispatch({
                type: 'addToBasket',
                payload: item
            });
        });
        bunBasket && totalPriceDispatch({
            type: 'addBunToBasket',
            payload: bunBasket
        });
    }, [mainBasket, bunBasket]);

    const removeIngredient = (ingredient) => {
        setMainBasket(mainBasket.filter(item => item !== ingredient));
    }

    return (
        <>
            <div className={classNames(BurgerConstructorStyles.div, "mb-10")}>

                <ul className={BurgerConstructorStyles.ul}>
                    {bunBasket && <li className="mb-3">
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${bunBasket.name} (верх)`}
                            price={bunBasket.price}
                            thumbnail={bunBasket.image}
                        />
                    </li>}

                    {mainBasket && <div className={BurgerConstructorStyles.mainIngredients}>
                        <div className={BurgerConstructorStyles.divOverScrollbar}>
                            <Scrollbars>
                                {mainBasket.map((ingredient, index) => {
                                    return (
                                        <li key={index}
                                            className={classNames("pt-3", BurgerConstructorStyles.mainIngredientLi)}>
                                            <div className={BurgerConstructorStyles.dragIcon}>
                                                <DragIcon type="primary"/>
                                            </div>
                                            <ConstructorElement
                                                key={index}
                                                isLocked={false}
                                                text={ingredient.name}
                                                price={ingredient.price}
                                                thumbnail={ingredient.image}
                                                handleClose={() => removeIngredient(ingredient)}
                                            />
                                        </li>
                                    );
                                })}
                            </Scrollbars>
                        </div>

                    </div>}

                    <li className={classNames("mt-3")}>
                        {bunBasket && <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${bunBasket.name} (низ)`}
                            price={bunBasket.price}
                            thumbnail={bunBasket.image}
                        />}
                    </li>

                </ul>

                <div className={BurgerConstructorStyles.totalAmountContainer}>
                    <div className={BurgerConstructorStyles.totalPrice}>
                        <span className="text text_type_digits-medium">{totalPrice.totalPrice}</span>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <Button name="" onClick={processOrder}>Оформить заказ</Button>
                </div>

            </div>

            {isOrderDetailsOpen &&
                <OrderDetails
                    close={closeOrderModal}
                    orderId={orderId}
                    isLoading={isOrderProcessing}
                    isOk={isOk}
                />
            }
        </>
    )
}

BurgerConstructor.propTypes = {}

export default BurgerConstructor;