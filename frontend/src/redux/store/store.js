import { configureStore } from "@reduxjs/toolkit";
import reviewSlices from "../slices/review/reviewSlice";

const store = configureStore({
  reducer: {


    review: reviewSlices,
  },
});

export default store;
