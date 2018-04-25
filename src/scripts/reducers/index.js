import { persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";
import * as actionType from '../actions/types';

const  config = {
    key: "root",
    storage,
};

const appReducer = persistCombineReducers(config, {

});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;
