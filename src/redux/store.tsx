import { configureStore } from "@reduxjs/toolkit";
import { baseAPISlice } from "./features/base.api.slice";

export const store = configureStore({
    reducer: {
        [baseAPISlice.reducerPath]: baseAPISlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(baseAPISlice.middleware);
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
