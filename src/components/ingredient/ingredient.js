import React from "react";
import PropTypes from 'prop-types';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

class Ingredient extends React.Component {
    state = {};

    render() {
        const ingredient = this.props.ingredient;
        return (ingredient &&
            <>
                <div style={{display: "flex", flexDirection: "column", flex: "1"}} onClick={this.props.onClick}>

                    {this.props.counter > 0 && <div style={{position: "relative"}}>
                        <Counter count={this.props.counter}/>
                    </div>}

                    <img style={{display: "block"}} src={ingredient.image} alt={ingredient.name}/>
                    <div style={{display: 'flex', alignContent: "center", justifyContent: "center"}}>
                        <span className="text text_type_digits-default pr-2">{ingredient.price}</span>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <p className="text text_type_main-default">
                        {ingredient.name}
                    </p>
                </div>
            </>
        )
    }
}

const IngredientShape = PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
});

Ingredient.propTypes = {
    ingredient: PropTypes.shape(IngredientShape).isRequired,
    counter: PropTypes.number,
    onClick: PropTypes.func,
}

export default Ingredient;