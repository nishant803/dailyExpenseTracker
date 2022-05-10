// import { configureStore } from "@reduxjs/toolkit";
// import userSlice from "./userSlice";

// export const store = configureStore({
//   reducer: {
//     user: userSlice,
//   },
// });
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import userSlice from "./userSlice";

const reducers = combineReducers({
  user: userSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  // devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export default store;
