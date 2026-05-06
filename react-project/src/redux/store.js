import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import languageReducer from "./slices/languageSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    language: languageReducer,
    auth: authReducer,
  },
});