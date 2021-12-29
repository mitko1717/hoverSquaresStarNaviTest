import { configureStore } from "@reduxjs/toolkit";
import fieldsReducer from "../features/fields/fieldsSlice";

export const store = configureStore({
  reducer: {
    fields: fieldsReducer,
  },
});
