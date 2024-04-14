import { createReducer } from "@reduxjs/toolkit";
import { SET_INTEREST, SET_AGE, SET_LOADING } from "../constants/userPreferecesConstant";

const initialState = {
    interest: null,
    loading: true,
    age: null,
};

export const recommendationReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(SET_INTEREST, (state, action) => {
            state.interest = action.payload;
            state.loading = false;
        })
        .addCase(SET_AGE, (state, action) => {
            state.age = action.payload;
            state.loading = false;
        })
        .addCase(SET_LOADING, (state, action) => {
            state.loading = action.payload;
        });
});