import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./productsSlice/productsSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice,
  },
});
