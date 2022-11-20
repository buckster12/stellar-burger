import {IIngredient} from "../../../types/ingredient-types";
import styles from "./bordered-ingredient-preview.module.css";
import React from "react";
import classNames from "classnames";

type TBorderedIngredientPreviewProps = {
    item: IIngredient,
    style?: React.CSSProperties,
    className?: string,
    additionalText?: string,
    imgOpacity?: number,
};

const BorderedIngredientPreview = ({
                                       item,
                                       className,
                                       style,
                                       additionalText,
                                       imgOpacity = 1,
                                   }: TBorderedIngredientPreviewProps) => {
    return (
        <div className={classNames(styles.previewContainer, className)} style={{...style}}>
            <img src={item.image} style={{opacity: `${imgOpacity}`}} alt=""/>
            {additionalText &&
                <span className={classNames(styles.additionalText, "text text_type_digits-default")}>
                    {additionalText}
                </span>
            }
        </div>
    );
}

export default BorderedIngredientPreview;
