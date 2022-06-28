import React from "react";
import {
    Button,
    ConstructorElement,
    CurrencyIcon,
    DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyles from './burger-constructor.module.css'
import PropTypes from "prop-types";
import {Scrollbars} from "react-custom-scrollbars";
import OrderDetails from "../order-details/order-details";
import classNames from "classnames";
import IngredientProptypes from "../../utils/proptypes/ingredient-proptypes";

const BurgerConstructor = ({bunBasket, mainBasket, removeIngredient}) => {

    const [isOrderDetailsOpen, setIsOrderDetailsOpen] = React.useState(false);
    const openOrderModal = () => {
        setIsOrderDetailsOpen(true);
    }
    const closeOrderModal = () => {
        setIsOrderDetailsOpen(false);
    }

    function getTotal() {
        let total = 0;
        mainBasket.forEach(item => {
            total += item.price;
        });
        if (bunBasket !== 'undefined') {
            total += (bunBasket.price) * 2;
        }
        return total;
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
                        <span className="text text_type_digits-medium">{getTotal()}</span>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <Button name="" onClick={openOrderModal}>Оформить заказ</Button>
                </div>

            </div>

            {isOrderDetailsOpen && <OrderDetails close={closeOrderModal}/>}
        </>
    )
}

BurgerConstructor.propTypes = {
    bunBasket: IngredientProptypes.isRequired,
    mainBasket: PropTypes.arrayOf(IngredientProptypes).isRequired,
    removeIngredient: PropTypes.func.isRequired
}

export default BurgerConstructor;