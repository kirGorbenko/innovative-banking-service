import {configureStore} from "@reduxjs/toolkit";
import {entryApi} from "./services/entry";

export const store = configureStore({
  reducer: {
    [entryApi.reducerPath]: entryApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(entryApi.middleware),
});
