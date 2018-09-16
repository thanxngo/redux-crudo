/*
 * Generic actions for CRUDL operations
 */
function getGroup(resource, action) {
    const typeName = `${action}`;
    const funcName = `${action.toLowerCase()}`;
    return {
        [`${typeName}_REQUEST`]: `${resource}_${action}_REQUEST`,
        [`${funcName}Request`]: payload => ({
            type: `${resource}_${action}_REQUEST`,
            payload,
        }),
        [`${typeName}_SUCCESS`]: `${resource}_${action}_SUCCESS`,
        [`${funcName}Success`]: payload => ({
            type: `${resource}_${action}_SUCCESS`,
            payload,
        }),
        [`${typeName}_FAILURE`]: `${resource}_${action}_FAILURE`,
        [`${funcName}Failure`]: (errorCode, errors) => ({
            type: `${resource}_${action}_FAILURE`,
            payload: {
                errorCode,
                errors,
            },
        }),
    };
}

/**
 * Function that returns basic actions types.
 * @param {String} resource - the resource of the reducer.
 * @returns {Object} - The actions and types.
 */
export function basicActionTypes(resource) {
    const actions = {};
    actions.SET_ITEM = `${resource}_SET_ITEM`;
    actions.setItem = payload => ({
        type: actions.SET_ITEM,
        payload,
    });
    actions.CLEAR_ITEM = `${resource}_CLEAR_ITEM`;
    actions.clearItem = () => ({
        type: actions.CLEAR_ITEM,
    });
    actions.CLEAR_ERRORS = `${resource}_CLEAR_ERRORS`;
    actions.clearErrors = () => ({
        type: actions.CLEAR_ERRORS,
    });
    return actions;
}

export function apiActionTypes(resource, methods = "crudlp") {
    if (resource === null) throw new Error("Expected resource");
    if (resource.trim() === "") throw new Error("Expected resource");
    let actionTypes = {
        ...basicActionTypes(resource),
    };

    // CREATE
    if (methods.indexOf("c") > -1) {
        actionTypes = {
            ...actionTypes,
            ...getGroup(resource, "CREATE"),
        };
    }
    // READ
    if (methods.indexOf("r") > -1) {
        actionTypes = {
            ...actionTypes,
            ...getGroup(resource, "READ"),
        };
    }
    // UPDATE
    if (methods.indexOf("u") > -1) {
        actionTypes = {
            ...actionTypes,
            ...getGroup(resource, "UPDATE"),
        };
    }
    // DELETE
    if (methods.indexOf("d") > -1) {
        actionTypes = {
            ...actionTypes,
            ...getGroup(resource, "DELETE"),
        };
    }
    // LIST
    if (methods.indexOf("l") > -1) {
        actionTypes = {
            ...actionTypes,
            ...getGroup(resource, "LIST"),
        };
    }
    // Generic POST action
    if (methods.indexOf("p") > -1) {
        actionTypes = {
            ...actionTypes,
            ...getGroup(resource, "POST"),
        };
    }

    /**
     * Register a new action linked to an api call
     * TODO: make it return a Promise.
     */
    actionTypes.register = function register(name, apiMethod, method) {
        // Get request, success, failure actions
        const REQUEST = this[`${method}Request`];
        const SUCCESS = this[`${method}Success`];
        const FAILURE = this[`${method}Failure`];
        this[name] = args => async dispatch => {
            dispatch(REQUEST(args));
            try {
                const response = await apiMethod(args);
                dispatch(SUCCESS(response));
            } catch (error) {
                dispatch(FAILURE(error.statusCode, error));
            }
        };
    };

    return actionTypes;
}
