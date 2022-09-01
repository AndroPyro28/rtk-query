import { configureStore } from "@reduxjs/toolkit";
import contactsApi from "../services/contactsApi";

const store = configureStore({
    reducer: {
        [contactsApi.reducerPath]: contactsApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck:false,
    }).concat(contactsApi.middleware),
})
    
export default store;