import React from "react";
import PropTypes from "prop-types";
import IngredientListStyles from "./ingredients-list.module.css";
import classNames from 'classnames';

class IngredientList extends React.Component {
    render() {
        const h1classes = classNames('text', 'text_type_main-medium', IngredientListStyles.h1);
        return (
            <>
                <h1 id={this.props.id} className={h1classes}>{this.props.title}</h1>
                <section className={IngredientListStyles.list}>
                    {this.props.children}
                </section>
            </>
        )
    }
}

IngredientList.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node
}

export default IngredientList;
