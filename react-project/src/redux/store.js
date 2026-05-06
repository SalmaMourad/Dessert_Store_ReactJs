import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import languageReducer from "./slices/languageSlice";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        language: languageReducer,
    },
});