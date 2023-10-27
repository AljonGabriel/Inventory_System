import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/authSlices";
import {usersSlice} from "./slices/apiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [usersSlice.reducerPath]: usersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersSlice.middleware),

  devTools: true,
});

export default store;
