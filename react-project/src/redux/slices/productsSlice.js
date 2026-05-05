import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_PRODUCTS = "http://localhost:3000/products";
const API_CATEGORIES = "http://localhost:3000/categories";

// ================== THUNKS ==================

// GET PRODUCTS
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const res = await axios.get(API_PRODUCTS);
    return res.data;
  }
);

// GET CATEGORIES
export const getCategories = createAsyncThunk(
  "products/getCategories",
  async () => {
    const res = await axios.get(API_CATEGORIES);
    return res.data;
  }
);

// ADD
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product) => {
    const res = await axios.post(API_PRODUCTS, product);
    return res.data;
  }
);

// EDIT
export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ id, product }) => {
    const res = await axios.put(`${API_PRODUCTS}/${id}`, product);
    return res.data;
  }
);

// DELETE
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    await axios.delete(`${API_PRODUCTS}/${id}`);
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
    // ===== CART =====
    addToCart: (state, action) => {
      const product = action.payload;
      const exist = state.cart.find((i) => i.id === product.id);

      if (exist) {
        exist.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },

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
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
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