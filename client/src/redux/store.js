import loaderReducer from "./loaderSlice";
import userReducer from "./userSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    loader: loaderReducer,
    users: userReducer
  }
});

export default store;