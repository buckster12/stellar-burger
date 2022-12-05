import {IIngredient} from "../../../types/ingredient-types";
import styles from "./bordered-ingredient-preview.module.css";
import React, {FC} from "react";
import classNames from "classnames";

type TBorderedIngredientPreviewProps = {
    item: IIngredient,
    className?: string,
    additionalText?: string,
    imgOpacity?: number,
    marginLeft?: number,
    zIndex?: number,
};

const BorderedIngredientPreview: FC<TBorderedIngredientPreviewProps> = (
    {
        item,
        className,
        additionalText,
        imgOpacity = 1,
        marginLeft = 0,
        zIndex = 0,
    }) => {
    return (
        <div className={classNames(styles.previewContainer, className)} style={{
            marginLeft: marginLeft,
            zIndex: zIndex,
        }}>
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
