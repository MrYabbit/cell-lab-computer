import {persistCombineReducers} from "redux-persist";
import storage from "redux-persist/lib/storage";
import * as actionType from '../actions/types';

const usernameInitialState = "CellMan";
const username = (state = usernameInitialState, action) => {
    switch (action.type) {
        case actionType.CHANGE_USERNAME:
            return action.data.username;
        default:
            return state;
    }
};

const config = {
    key: "root",
    storage,
};

const appReducer = persistCombineReducers(config, {
    username
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;
