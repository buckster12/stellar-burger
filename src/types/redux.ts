import {IIngredientsState} from "./ingredient-types";
import {IBasket, IOrderState} from "./order";
import {FeedState} from "../services/actions/feed-ws-slice";
import store from "../services/store";

export interface IModalState {
    modalContent: string;
    isModalOpen: boolean;

}

interface IResetPasswordState {
    email: string,
    error: boolean,
    isLoading: boolean,
    newPassword: string,
    emailToken: string,
    errorMessage: string,
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
    feed: FeedState;
}

export type TOrder = {
    _id: string;
    ingredients: Array<string>;
    status: "created" | "pending" | "done";
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
};

export type AppDispatch = typeof store.dispatch;