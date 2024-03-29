import React, {FC} from "react";
import styles from "./ingredients-list.module.css";
import classNames from 'classnames';

type TIngredientListProps = {
    id: string;
    title: string;
    children: React.ReactNode;
}

const IngredientList:FC<TIngredientListProps> = ({id, title, children}) => {
    const h1classes: string = classNames('text', 'text_type_main-medium', styles.h1);
    return (
        <div id={`section-${id}`}>
            <h1 id={id} className={h1classes}>{title}</h1>
            <section className={styles.list}>
                {children}
            </section>
        </div>
    )
}

export default IngredientList;
