import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../slices/counter.slice";
import productSlice from "../slices/product.slice";

const store = configureStore({
  reducer: {
    counter: counterSlice,
    product: productSlice,
  },
});

export default store;
