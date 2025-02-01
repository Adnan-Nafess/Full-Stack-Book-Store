import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./auth";

const store = configureStore({
    reducer: {
        auth: authReducers,
    },
});

export default store;