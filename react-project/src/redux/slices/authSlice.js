import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:3000/users";

// REGISTER
export const registerUser = createAsyncThunk(
  "auth/register",
  async (user) => {
    const res = await axios.post(API, user);
    return res.data;
  }
);

// LOGIN
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    const res = await axios.get(`${API}?email=${email}`);

    const user = res.data[0];

    if (!user || user.password !== password) {
      return rejectWithValue("Invalid email or password");
    }

    return user;
  }
);

const savedUser = JSON.parse(localStorage.getItem("user"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: savedUser || null,
    isLoading: false,
    error: null,
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    setUser: (state, action) => {
    state.user = action.payload;
    localStorage.setItem("user", JSON.stringify(action.payload));
  },
  },

  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

// export const { logout } = authSlice.actions;
export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;