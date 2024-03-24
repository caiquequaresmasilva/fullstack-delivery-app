import { PayloadAction, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { deliveryApiSlice } from "./api";

type AuthState = {
  name: string;
  role: Role;
  token: string;
};

const initialState: AuthState = {
  name: "",
  role: "customer",
  token: "",
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.role = action.payload.role;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        deliveryApiSlice.endpoints.login.matchFulfilled,
        deliveryApiSlice.endpoints.createUser.matchFulfilled
      ),
      (
        state,
        {
          payload: {
            token = initialState.token,
            name = initialState.name,
            role = initialState.role,
          },
        }
      ) => {
        state.token = token;
        state.name = name;
        state.role = role;

        localStorage.setItem("token", token);
        localStorage.setItem("name", name);
        localStorage.setItem("role", role);
      }
    );
  },
});

export const { setAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
