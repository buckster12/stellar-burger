import React from "react";
import IngredientListStyles from "./ingredients-list.module.css";
import classNames from 'classnames';

type TIngredientListProps = {
    id: string;
    title: string;
    children: React.ReactNode;
}

const IngredientList = ({id, title, children}: TIngredientListProps) => {
    const h1classes: string = classNames('text', 'text_type_main-medium', IngredientListStyles.h1);
    return (
        <div id={`section-${id}`}>
            <h1 id={id} className={h1classes}>{title}</h1>
            <section className={IngredientListStyles.list}>
                {children}
            </section>
        </div>
    )
}

export default IngredientList;
