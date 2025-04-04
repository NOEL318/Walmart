import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authServices from "./useAuth";

export const SignUp = createAsyncThunk("signup", async (user, thunkAPI) => {
  try {
    return await authServices.signup(user);
  } catch (error) {
    const message = error.response.data || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const SignIn = createAsyncThunk("signin", async (user, thunkAPI) => {
  try {
    return await authServices.signin(user);
  } catch (error) {
    const message = error.response.data || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const SignOut = createAsyncThunk("signout", async (thunkAPI) => {
  try {
    return await authServices.signout();
  } catch (error) {
    const message = error.response.data || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const loginwithoutpassword = createAsyncThunk(
  "loginwithoutpassword",
  async (thunkAPI) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      return await authServices.loginwithoutpassword(user);
    } catch (error) {
      const message = error.response.data || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    isError: false,
    isSucces: false,
    message: "",
  },
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSucces = false;
      state.message = "";
    },
    logout: (state) => {
      state.user = null;
      state.isError = false;
      state.isLoading = false;
      state.isSucces = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SignUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(SignUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.user = action.payload;
      })
      .addCase(SignUp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(SignIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(SignIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.user = action.payload;
      })
      .addCase(SignIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(SignOut.fulfilled, (state, action) => {
        state.user = null;
      })
      .addCase(loginwithoutpassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginwithoutpassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.user = action.payload;
      })
      .addCase(loginwithoutpassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = userSlice.actions;
export const selectUser = async (state) => {
  state.user;
};
export default userSlice.reducer;
