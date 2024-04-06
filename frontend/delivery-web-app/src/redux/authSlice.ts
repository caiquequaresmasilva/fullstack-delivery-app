import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { deliveryApiSlice } from "./api";
import { RootState } from "./store";

export type AuthState = {
  name: string;
  id: string;
  token: string;
};

const initialState: AuthState = {
  name: "unknown",
  id: "",
  token: "",
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = initialState.token;
      state.id = initialState.id;
      state.name = initialState.name;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        deliveryApiSlice.endpoints.login.matchFulfilled,
        deliveryApiSlice.endpoints.createUser.matchFulfilled
      ),
      (state, { payload: { id, name, token } }) => {
        state.token = token || initialState.token;
        state.id = id || initialState.id;
        state.name = name || initialState.name;
      }
    );
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
export const selectAuth = (state: RootState) => state.auth;
