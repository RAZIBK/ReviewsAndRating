import {
    createAsyncThunk,
    createSlice,
    isAsyncThunkAction,
    createAction,
  } from "@reduxjs/toolkit";
  import axios from "axios";
  import { baseUrl } from "../../../utils/baseUrl";
  
  const createReviewActionReset = createAction("review/reset");
  
  export const createReviewAction = createAsyncThunk(
    "review/create",
    async (formData, { rejectWithValue, getState, dispatch }) => {
        console.log(formData);
    //   const user = getState()?.users;
    //   const { userAuth } = user;
    //   const config = {
    //     headers: {
    //       Authorization: `Bearer ${userAuth?.token}`,
    //     },
    //   };
      try {
        const { data } = await axios.post(
          `${baseUrl}/api/review`,
          formData,
        //   config
        );
        dispatch(createReviewActionReset())
        return data;
      } catch (error) {
        if (!error?.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }
  );

  export const fetchAllReviewAction = createAsyncThunk(
    "review/allreview",
    async (formData, { rejectWithValue, getState, dispatch }) => {
     
    //   const user = getState()?.users;
    //   const { userAuth } = user;
    //   const config = {
    //     headers: {
    //       Authorization: `Bearer ${userAuth?.token}`,
    //     },
    //   };
      try {
        const { data } = await axios.get(
          `${baseUrl}/api/review`,
  
        //   config
        );
        return data;
      } catch (error) {
        if (!error?.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }
  );
  
 
  
  const reviewSlices = createSlice({
    name: "review",
    initialState: {},
    extraReducers: (builder) => {
      builder.addCase(createReviewAction.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(createReviewActionReset, (state, action) => {
        state.isCreated = true;
      });
      builder.addCase(createReviewAction.fulfilled, (state, action) => {
        state.loading = false;
        state.reviewCreated = action?.payload;
        state.isCreated = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(createReviewAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });
  
      

      builder.addCase(fetchAllReviewAction.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(fetchAllReviewAction.fulfilled, (state, action) => {
        state.loading = false;
        state.allreview = action?.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(fetchAllReviewAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });

    },
  });
  
  export default reviewSlices.reducer;
  