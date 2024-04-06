import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { deliveryApiSlice } from "./api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [deliveryApiSlice.reducerPath]: deliveryApiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware()
    .concat(deliveryApiSlice.middleware)
});
    
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
