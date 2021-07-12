import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { pokemonApi } from "./pokemonApi";

const combinedReducer = combineReducers({
  [pokemonApi.reducerPath]: pokemonApi.reducer,
});

const reducer: typeof combinedReducer = (state, action) => {
  if (action.type === HYDRATE) {
    return action.payload;
  }
  return combinedReducer(state, action);
};

const makeStore = () =>
  configureStore({
    reducer,
    middleware: (gDM) => gDM().concat(pokemonApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
