import tokenReducer from "./Auth";
import { persistReducer } from "redux-persist";
import { createStore, combineReducers } from "redux";
import storage from "redux-persist/lib/storage"; // local storage 사용

const persistConfig = {
  key: "root",
  //local storage에 저장
  storage: storage,
};

const allReducers = combineReducers({
  Auth: tokenReducer,
});

const store = createStore(
  persistReducer(persistConfig, allReducers),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
