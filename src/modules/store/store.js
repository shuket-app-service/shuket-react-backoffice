import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { PersistReducer } from "./reducer";
import logger from 'redux-logger';


const store = configureStore({
  reducer: PersistReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(logger),
  devTools: process.env.NODE_ENV !== "production"
});

export const persistor = persistStore(store);

export default store;