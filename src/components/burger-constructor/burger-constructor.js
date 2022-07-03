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
import {MainBasketContext} from "../context/main-basket";
import {ORDER_URL} from "../../utils/constants";


function reducer(state, action) {
    switch (action.type) {
        case 'addToBasket':
            return {
                ...state,
                totalPrice: state.totalPrice + action.payload.price
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
                    ...mainBasket.map(item => item._id)
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

    useEffect(() => {
        totalPriceDispatch({type: 'resetBasket'});

        mainBasket.forEach(item => {
            totalPriceDispatch({
                type: 'addToBasket',
                payload: item
            });
        });
    }, [mainBasket]);

    const removeIngredient = (ingredient) => {
        setMainBasket(mainBasket.filter(item => item !== ingredient));
    }

    const topBun = mainBasket[0];
    const bottomBun = mainBasket[mainBasket.length - 1];

    return (
        <>
            <div className={classNames(BurgerConstructorStyles.div, "mb-10")}>

                <ul className={BurgerConstructorStyles.ul}>
                    {topBun && <li className="mb-3">
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${topBun.name} (верх)`}
                            price={topBun.price}
                            thumbnail={topBun.image}
                        />
                    </li>}

                    {mainBasket && <div className={BurgerConstructorStyles.mainIngredients}>
                        <div className={BurgerConstructorStyles.divOverScrollbar}>

                            <Scrollbars>
                                {mainBasket.filter(item => item.type === 'main').map((ingredient, index) => {

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

                    {bottomBun && <li className={classNames("mt-3")}>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${bottomBun.name} (низ)`}
                            price={bottomBun.price}
                            thumbnail={bottomBun.image}
                        />
                    </li>}

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