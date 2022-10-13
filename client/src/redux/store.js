import {  combineReducers, configureStore } from "@reduxjs/toolkit";
 import { applyMiddleware } from "redux"
 import thunk from "redux-thunk";
import {
  persistStore,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { loginReducer } from "./reducers/userReducer";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: loginReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({reducer:persistedReducer}, applyMiddleware(thunk));
export let persistor = persistStore(store);
// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

