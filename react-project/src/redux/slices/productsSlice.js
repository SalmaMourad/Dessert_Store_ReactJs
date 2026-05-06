import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

// ================== THUNKS ==================

export const getProducts = createAsyncThunk(
    "products/getProducts",
    async (_, { getState }) => {
        const lang = getState().language.lang;

        const res = await axios.get(`${BASE_URL}/products_${lang}`);
        return res.data;
    }
);

export const getCategories = createAsyncThunk(
    "products/getCategories",
    async (_, { getState }) => {
        const lang = getState().language.lang;

        const res = await axios.get(`${BASE_URL}/categories_${lang}`);
        return res.data;
    }
);

export const addProduct = createAsyncThunk(
    "products/addProduct",
    async (product, { getState }) => {
        const lang = getState().language.lang;

        const res = await axios.post(
            `${BASE_URL}/products_${lang}`,
            product
        );

        return res.data;
    }
);

export const editProduct = createAsyncThunk(
    "products/editProduct",
    async ({ id, product }, { getState }) => {
        const lang = getState().language.lang;

        const res = await axios.put(
            `${BASE_URL}/products_${lang}/${id}`,
            product
        );

        return res.data;
    }
);

export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (id, { getState }) => {
        const lang = getState().language.lang;

        await axios.delete(`${BASE_URL}/products_${lang}/${id}`);
        return id;
    }
);

// ================== SLICE ==================

const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        categories: [],
        cart: [],
        isLoading: false,
        error: null,
    },

    reducers: {
        // CART
        addToCart: (state, action) => {
            const product = action.payload;

            const exist = state.cart.find((i) => i.id === product.id);

            if (exist) {
                exist.quantity += 1;
            } else {
                state.cart.push({ id: product.id, quantity: 1 });
            }
        },
        // addToCart: (state, action) => {
        //   const product = action.payload;
        //   const exist = state.cart.find((i) => i.id === product.id);

        //   if (exist) {
        //     exist.quantity += 1;
        //   } else {
        //     state.cart.push({ id: product.id, quantity: 1 });
        //   }
        // },

        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((i) => i.id !== action.payload);
        },

        increaseQuantity: (state, action) => {
            const item = state.cart.find((i) => i.id === action.payload);
            if (item) item.quantity += 1;
        },

        decreaseQuantity: (state, action) => {
            const item = state.cart.find((i) => i.id === action.payload);
            if (item && item.quantity > 1) item.quantity -= 1;
        },
    },

    extraReducers: (builder) => {
        builder
            // PRODUCTS
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.isLoading = false;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.error = action.error.message;
                state.isLoading = false;
            })

            // CATEGORIES
            .addCase(getCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.isLoading = false;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.error = action.error.message;
                state.isLoading = false;
            })

            // ADD
            .addCase(addProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })

            // EDIT
            .addCase(editProduct.fulfilled, (state, action) => {
                state.products = state.products.map((p) =>
                    p.id === action.payload.id ? action.payload : p
                );
            })

            // DELETE
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(
                    (p) => p.id !== action.payload
                );
            });
    },
});

export const {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
} = productsSlice.actions;

export default productsSlice.reducer;
