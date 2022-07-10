import React from "react";
import PropTypes from "prop-types";
import IngredientListStyles from "./ingredients-list.module.css";
import classNames from 'classnames';


const IngredientList = ({id, title, children}) => {
    const h1classes = classNames('text', 'text_type_main-medium', IngredientListStyles.h1);
    return (
        <div id={`section-${id}`}>
            <h1 id={id} className={h1classes}>{title}</h1>
            <section className={IngredientListStyles.list}>
                {children}
            </section>
        </div>
    )
}

IngredientList.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node
}

export default IngredientList;
