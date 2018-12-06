import { CREATE, READ, UPDATE, DELETE, LIST, POST } from "./utils";

/**
 * Utility function that return the name of the action from the
 * constant.
 *
 * @param {number} action - Action constant
 *
 * @returns {string} action - Action name
 */
export function getActionName(action) {
    switch (action) {
        case CREATE:
            return "create";
        case READ:
            return "read";
        case UPDATE:
            return "update";
        case DELETE:
            return "delete";
        case LIST:
            return "list";
        case POST:
            return "post";
        default:
            throw Error("action is invalid");
    }
}

/**
 * Utility function for assigning an API method to an action
 *
 * @param {Object} actions - Actions object as generated by apiActions
 * @param {function} apiMethod - An api method that take a context
 * object as parameter (payload of the action)
 * @param {number} action - One of (CREATE, READ, UPDATE, DELETE, LIST, POST)
 *
 * @returns {Promise} - Resolves to an action.
 */
export function assignCrudMethod(actions, apiMethod, action) {
    // Get request, success, failure actions
    const actionName = getActionName(action);
    const REQUEST = actions[`${actionName}Request`];
    const SUCCESS = actions[`${actionName}Success`];
    const FAILURE = actions[`${actionName}Failure`];
    return args => async dispatch => {
        dispatch(REQUEST(args));
        try {
            const response = await apiMethod(args);
            return dispatch(SUCCESS(response.status, response.data));
        } catch (error) {
            return dispatch(
                FAILURE(error.response.status, error.response.data)
            );
        }
    };
}

/**
 * Utility function for CRUDLP actions.
 *
 * @param {string} resource - Name of the resource with prefix
 * @param {string} action - One of (CREATE, READ, UPDATE, DELETE, LIST, POST)
 *
 * @returns {Object} actions - Actions type and methods.
 */
function getGroup(resource, action) {
    const funcName = `${action.toLowerCase()}`;
    return {
        [`${action}_REQUEST`]: `${resource}_${action}_REQUEST`,
        [`${funcName}Request`]: payload => ({
            type: `${resource}_${action}_REQUEST`,
            payload,
            error: false,
        }),
        [`${action}_SUCCESS`]: `${resource}_${action}_SUCCESS`,
        [`${funcName}Success`]: (statusCode, data) => ({
            type: `${resource}_${action}_SUCCESS`,
            payload: {
                data,
                statusCode,
            },
            error: false,
        }),
        [`${action}_FAILURE`]: `${resource}_${action}_FAILURE`,
        [`${funcName}Failure`]: (statusCode, data) => ({
            type: `${resource}_${action}_FAILURE`,
            payload: { statusCode, data },
            error: true,
        }),
    };
}

/**
 * Return actions for a resource and a list of CRUDLP methods.
 *
 * @param {string} resource - Name of the resource with prefix
 * @param {number} methods - Combinaison of (CREATE, READ, UPDATE, DELETE, LIST, POST)
 *
 * @returns {Object} redux actions for resource and methods.
 */
export function apiActions(resource, methods = 0) {
    if (resource === null) throw new Error("Expected resource");
    if (resource.trim() === "") throw new Error("Expected resource");

    // Initialize with basic actions.
    let actions = {
        SET_ITEM: `${resource}_SET_ITEM`,
        setItem: payload => ({
            type: `${resource}_SET_ITEM`,
            payload,
        }),
        CLEAR_ITEM: `${resource}_CLEAR_ITEM`,
        clearItem: () => ({
            type: `${resource}_CLEAR_ITEM`,
        }),
        CLEAR_ERRORS: `${resource}_CLEAR_ERRORS`,
        clearErrors: () => ({
            type: `${resource}_CLEAR_ERRORS`,
        }),
    };

    // CREATE
    if (methods & CREATE) {
        actions = {
            ...actions,
            ...getGroup(resource, "CREATE"),
        };
    }
    // READ
    if (methods & READ) {
        actions = {
            ...actions,
            ...getGroup(resource, "READ"),
        };
    }
    // UPDATE
    if (methods & UPDATE) {
        actions = {
            ...actions,
            ...getGroup(resource, "UPDATE"),
        };
    }
    // DELETE
    if (methods & DELETE) {
        actions = {
            ...actions,
            ...getGroup(resource, "DELETE"),
        };
    }
    // LIST
    if (methods & LIST) {
        actions = {
            ...actions,
            ...getGroup(resource, "LIST"),
        };
    }
    // POST
    if (methods & POST) {
        actions = {
            ...actions,
            ...getGroup(resource, "POST"),
        };
    }

    return actions;
}
