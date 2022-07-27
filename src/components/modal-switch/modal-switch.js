import {Route, Switch, useHistory, useLocation, useRouteMatch} from "react-router-dom";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import {useDispatch, useSelector} from "react-redux";
import {hideModal} from "../../services/actions/modal-slice";
import React, {useEffect} from "react";
import {getAllIngredients} from "../../services/actions/ingredients-slice";

const ModalSwitch = () => {
    const location = useLocation();
    const history = useHistory();
    const background = location.state && location.state.background;
    const dispatch = useDispatch();

    const {ingredients} = useSelector(state => ({
            ingredients: state.ingredients.data,
        }
    ));

    const route = useRouteMatch('/ingredients/:id');
    const id = route && route.params.id;
    const ingredient = ingredients.find(item => item._id === id);

    useEffect(() => {
        if (background === undefined) {
            dispatch(getAllIngredients());
        }
    }, [background, dispatch]);

    const handleModalClose = () => {
        dispatch(hideModal());
        // get prev page location and just replace
        // history.replace(location.state.background);
        // history.replace(null, null, '/ingredients');
        history.goBack();
    };

    return (
        ingredient && <>
            <Switch location={background || location}>
                <Route path='/ingredients/:ingredientId' exact={true}>
                    <div style={{width: "600px", margin: "auto"}}>
                        <IngredientDetails chosenIngredient={ingredient}/>
                    </div>
                </Route>
            </Switch>

            {background && (
                <Route
                    path='/ingredients/:ingredientId'
                    children={
                        <Modal onClose={handleModalClose} title="">
                            <IngredientDetails chosenIngredient={ingredient}/>
                        </Modal>
                    }
                />
            )}
        </>
    );
};


export default ModalSwitch;