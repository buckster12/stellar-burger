import store from "../services/store";

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