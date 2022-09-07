import {createSlice} from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isModalOpen: false,
        modalContent: {}
    },
    reducers: {
        showModal: (state, action) => {
            state.modalContent = action.payload;
            state.isModalOpen = true;
        },
        hideModal: (state) => {
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
