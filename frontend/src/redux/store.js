import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import companySlice from "./companySlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

// ✅ Persist config
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// ✅ Root reducer
const rootReducer = combineReducers({
  auth: authSlice,
  job: jobSlice,
  company: companySlice,
});

// ✅ Persisted reducer (THIS WAS MISSING)
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// ✅ Persistor
export const persistor = persistStore(store);

export default store;
