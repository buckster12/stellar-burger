import {useDrag, useDrop} from "react-dnd";
import {swapElements, removeIngredient} from "../../services/actions/basket-slice";
import {useDispatch} from "react-redux";
import classNames from "classnames";
import BurgerConstructorStyles from "../burger-constructor/burger-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FC, useRef} from "react";
import {IIngredient} from "../../types/ingredient-types";

type TCartElementProps = {
    index: number,
    ingredient: IIngredient
};

const CartElement: FC<TCartElementProps> = ({index, ingredient}) => {
    const dispatch = useDispatch<any>();
    const [{isDragging}, dragRef] = useDrag({
        type: 'cart-element',
        item: {id: ingredient._id, index},
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, dropRef] = useDrop({
        accept: 'cart-element',
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        // This method is called when we hover over an element while dragging
        hover(item: any, monitor) { // item is the dragged element
            if (!elementRef.current) {
                return;
            }
            const dragIndex = item.index;
            // current element where the dragged element is hovered on
            const hoverIndex = index;
            // If the dragged element is hovered in the same place, then do nothing
            if (dragIndex === hoverIndex) {
                return;
            }

            // Determine rectangle on screen
            // @ts-ignore
            const hoverBoundingRect = elementRef.current?.getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            // @ts-ignore
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items' height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            /*
              Update the index for dragged item directly to avoid flickering
              when the image was half dragged into the next
            */
            item.index = hoverIndex;
            // Dispatch the swapElements action to update the state
            dispatch(swapElements({dragIndex, hoverIndex}));
        }
    });

    const elementRef = useRef<HTMLLIElement>(null);
    dropRef(dragRef(elementRef));

    return (
        <li key={ingredient.uuid} ref={elementRef}
            style={{opacity: isDragging ? 0 : 1}}
            className={classNames("pt-3", BurgerConstructorStyles.mainIngredientLi)}>
            <div className={BurgerConstructorStyles.dragIcon}>
                <DragIcon type="primary"/>
            </div>
            <ConstructorElement
                isLocked={false}
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={() => dispatch(removeIngredient(ingredient.uuid))}
            />
        </li>
    )
}

export default CartElement;