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
import IngredientShare from "../ingredient/ingredient";

const BurgerConstructor = ({bunBasket, mainBasket, removeIngredient}) => {

    function getTotal() {
        let total = 0;
        mainBasket.forEach(item => {
            total += item.price;
        });
        bunBasket.forEach(item => {
            total += item.price;
        });
        return total;
    }

    return (
        <>
            <div style={{display: "flex", flexDirection: "column", minWidth: "600px", justifyContent: "right"}}
                 className={BurgerConstructorStyles.div}>


                <Scrollbars style={{minHeight: "300px", maxHeight: "464px"}}>
                    <ul style={{display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: "right"}}>
                        {mainBasket.map((ingredient, index) => {
                            return (
                                <li style={{maxWidth: "536px", display: "flex", alignContent: "center"}}>
                                    <div style={{alignSelf: "center"}}>
                                        <DragIcon type="primary"/>
                                    </div>
                                    <ConstructorElement
                                        key={index}
                                        // type=""
                                        isLocked={false}
                                        text={ingredient.name}
                                        price={ingredient.price}
                                        thumbnail={ingredient.image}
                                        handleClose={() => removeIngredient(ingredient)}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </Scrollbars>

                <div className={BurgerConstructorStyles.bottomBun}>
                    {/*<LockIcon/>*/}
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail=""
                    />
                </div>


                {/*
                     <ConstructorElement
                                key={index}
                                type="top"
                                isLocked={true}
                                text={ingredient.name}
                                price={ingredient.price}
                                thumbnail={ingredient.image}
                            />
                    <ConstructorElement
                        text="Краторная булка N-200i (верх)"
                        price={50}
                        thumbnail={img}
                    />
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={img}
                    />*/}

                <div style={{display: "flex", justifyContent: "right", columnGap: "40px"}}>
                    <div style={{alignSelf: "center"}}>
                        <span className="text text_type_digits-medium">{getTotal()}</span>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <Button name="">Оформить заказ</Button>
                </div>


            </div>

        </>
    )
}

BurgerConstructor.propTypes = {
    mainBasket: PropTypes.arrayOf(PropTypes.shape(IngredientShare)),
    bunBasket: PropTypes.arrayOf(PropTypes.shape(IngredientShare)),
    removeIngredient: PropTypes.func.isRequired
}

export default BurgerConstructor;