import * as actionType from "./types";

export const changeUsername = (username) => {
    return {
        type: actionType.CHANGE_USERNAME,
        data: {
            username
        }
    }
};