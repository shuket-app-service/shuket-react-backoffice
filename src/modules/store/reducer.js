import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { authSlice } from "./auth/slice";


const PersistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth"],
};
const reducers = combineReducers({
  auth: authSlice.reducer,
});

export const PersistReducer = persistReducer(PersistConfig, reducers);
