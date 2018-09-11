import { basicActionTypes, apiActionTypes } from "./actions";
import { apiReducer } from "./reducers";
import { BaseApiReducerType } from "./types";
import { getActionsNameSpace } from "./utils";

export default {
    apiActionTypes,
    BaseApiReducerType,
    basicActionTypes,
    getActionsNameSpace,
};
