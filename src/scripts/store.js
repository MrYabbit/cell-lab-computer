import {createStore, applyMiddleware} from "redux";
import {logger} from "redux-logger";
import {persistStore} from "redux-persist";
import rootReducer from "./reducers/index";

export const store = createStore(
    rootReducer,
    applyMiddleware(logger)
);
export const persistor = persistStore(store);
