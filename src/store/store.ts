import { configureStore, createSlice } from "@reduxjs/toolkit";

const countSlice = createSlice({
  name: "count",
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
    set: (state, action) => action.payload,
  },
});

export const { increment, decrement, set } = countSlice.actions;

export const store = configureStore({
  reducer: {
    count: countSlice.reducer,
  },
});

// Types for usage in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
