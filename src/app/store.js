import { configureStore } from "@reduxjs/toolkit";
import { dashReducer } from "../redux/dashboardReducer";
import { habitReducer } from "../redux/habitReducer";

export const store = configureStore({
  reducer: {
    dashReducer,
    habitReducer,
  },
});
