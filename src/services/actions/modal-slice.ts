import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import React, {ReactNode} from "react";

type TModalState = {
    isModalOpen: boolean,
    modalContent: React.ReactNode | null
}
const initialState: TModalState = {
    isModalOpen: false,
    modalContent: null
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        showModal: (state: TModalState, action: PayloadAction<ReactNode>) => {
            state.modalContent = action.payload;
            state.isModalOpen = true;
        },
        hideModal: (state: TModalState) => {
            state.isModalOpen = false;
            state.modalContent = null;
        }
    },
    extraReducers: {}
});

export const {
    hideModal,
    showModal
} = modalSlice.actions;

const modalReducer = modalSlice.reducer;
export default modalReducer;
