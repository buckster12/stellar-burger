import {IIngredientsState} from "./ingredient-types";
import {IBasket, IOrderState} from "./order";

export interface IModalState {
    modalContent: string;
    isModalOpen: boolean;

}

interface IResetPasswordState {
    email: string,
    error: boolean,
    isLoading: boolean,
}

interface ILoginState {
    isLoggedIn: boolean;
    error: boolean;
    passwordVisible: boolean;
    password: string;
    email: string;
    isLoading: boolean;

}

export type TUser = {
    name: string,
    email: string,
};

export type TProfileForm = {
    name: string;
    email: string;
    password: string;
};

type TProfileDisabledFields = {
    name_disabled: boolean;
    email_disabled: boolean;
    password_disabled: boolean;
};

export interface IProfileState {
    isLoading: boolean;
    error: boolean;
    form: TProfileForm;
    user: TUser;
    disabled: TProfileDisabledFields;
}

interface IRegisterState {
    email: string;
    password: string;
    name: string;
    error: boolean;
    isLoading: boolean;
}

export interface IMainState {
    resetPassword: IResetPasswordState;
    login: ILoginState;
    basket: IBasket;
    order: IOrderState;
    ingredients: IIngredientsState;
    modal: IModalState;
    profile: IProfileState;
    register: IRegisterState;
}