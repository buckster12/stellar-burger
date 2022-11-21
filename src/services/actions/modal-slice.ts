import {createSlice} from "@reduxjs/toolkit";
import React from "react";

type TModalState = {
    isModalOpen: boolean,
    modalContent: React.ReactNode | {}
}
const initialState: TModalState = {
    isModalOpen: false,
    modalContent: {}
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        showModal: (state: TModalState, action) => {
            state.modalContent = action.payload;
            state.isModalOpen = true;
        },
        hideModal: (state: TModalState) => {
            state.isModalOpen = false;
            state.modalContent = {};
        }
    },
    extraReducers: {}
});

export const {
    hideModal,
} = modalSlice.actions;

const modalReducer = modalSlice.reducer;
export default modalReducer;
