# redux-crudo

This package is a framework to integrate redux with a REST api.

It provides, generic reducers and actions for all rest methods and
a generic post method: (create, read, update, delete, list and post).


## Goal

The goal of this project is to handle all the hassle of writing
reducers and actions for a REST API. Since most of the code will be
the same overall the application it can be shared.

The idea is to provide generic reducers and action for the common
**redux** pattern of **REQUEST**, **SUCCESS**, **FAILURE**.

It is meant to be use with
[**redux-thunk**](https://github.com/reduxjs/redux-thunk) middleware.


## Disclaimer

This project was made initially to works with a [Django Rest Framework
Api](http://www.django-rest-framework.org/) and the
[axios](https://github.com/axios/axios) library , so some behaviours
(especially errors handling) might works better with DRF. Feel free to
PR for more generic solutions.

## State

Each resource will have it's own reducer creating the following state:


```javascript
const initialState = {
  args: {},
  item: {},
  items: new Map(),
  error: false,
  errors: {},
  errorCode: 0,
  result: {},
  loading: false,
  status: null
}
```

- args: is set to action.payload in all **REQUEST** actions.
- item: is the item in *READ* & *UPDATE* actions, it's automatically & optimistically updated.
- items: is a Map() used in *LIST* actions, it's automatically &
  optimistically updated. For now Map() objects are sorted according
  to the API result and can be accessed by their uuid. For now only
  uuid keyed items are supported. **TODO** : handle any kind of primary key.
- error: boolean if last request failed or not.
- errors: set to response.data (if action is generated with the register method and used the standard api wrapper).
- errorCode: http error code response. **TODO** set this to http code everytime ?
- result: response.data in *CREATE* & *POST* request. **TODO** merge this with item ?
- loading: set to true in **REQUEST** set to false in **FAILURE** or **SUCCESS**.
- status: set to null in **REQUEST**, "success" in SUCCESS, "failure" in FAILURE.

### Uses cases

TODO

## Reducers

**redux-api/reducers.js**
```javascript
/**
 * apiReducer Return a reducer for a resource.
 * @param {resource} string Name of the resource should be all caps. eg. "ACCOUNT"
 * @param {methods} string List of methods that should be handled by the reducer.
 *    Should be a subset of "crudlp".
 */
export function apiReducer(resource: string, methods = "crudlp");
```

### Example of a reducer

```javascript
/**
 * Account reducers.
 */
import { combineReducers } from "redux";
import { apiReducer } from "redux-api/reducers";

// Handle read and update
export default const accountReducer = apiReducer("ACCOUNT", "ru");
```

## Actions

**redux-api/actions.js**
```javascript
/**
 * apiActionTypes Return an action object for a resource.
 * @param {resource} string Name of the resource should be all caps. eg. "ACCOUNT"
 * @param {methods} string List of methods that should be handled by the reducer.
 *    Should be a subset of "crudlp".
 */
export function apiActionTypes(resource, methods = "crudlp");
```

`apiActionTypes` will return an object containing actions types for the resource.

Example:

```
const AccountActions = apiActionTypes("ACCOUNT", "ru");
```

accountActions will contain the following action types:

```
READ_FAILURE: "ACCOUNT_READ_FAILURE"
READ_REQUEST: "ACCOUNT_READ_REQUEST"
READ_SUCCESS: "ACCOUNT_READ_SUCCESS"
UPDATE_FAILURE: "ACCOUNT_UPDATE_FAILURE"
UPDATE_REQUEST: "ACCOUNT_UPDATE_REQUEST"
UPDATE_SUCCESS: "ACCOUNT_UPDATE_SUCCESS"
```

And the following methods
```
readFailure: ƒ (errorCode, errors)
readRequest: ƒ (payload)
readSuccess: ƒ (payload)
updateFailure: ƒ (errorCode, errors)
updateRequest: ƒ (payload)
updateSuccess: ƒ (payload)
register: ƒ register(name, apiMethod, method)
```

### register()

The register method associated with every **apiActionType** allows to
register a new api function.

```javascript
/**
 * register Register a new api function to the apiActionType object.
 * @param {name} string Name of the action.
 * @param {apiMethod} func Method to call for the REQUEST action.
 * @param {method} string Rest method to use (must be one of
 * ["create", "read", "update", "list", "delete", "post"]
 */
function register(name: string, apiMethod: func, method: string);
```

Example:
```javascript
AccountActions.register("fetch", AccountApi.fetch, "read");
```

Register the action `"fetch"` to `AccountActions` so we can now
dispatch `AccountActions.fetch()` and this will trigger the
**REQUEST** and **SUCCESS** or **FAILURE** action accordingly.


#### Note on the api method.

Api methods must by *async* and return the following:

```javascript
// In case of success
return {
   status: "ok",
   data: response.data
};

// In case of failure
return {
  status: "error",
  statusCode: error.response.status,
  error: error.response.data
};
```

### Full actions.js example

```javascript
import AccountApi from "api/account";
import { apiActionTypes } from "redux-api/actions";
import { getSessionUserId } from "utils/session";

const AccountActions = apiActionTypes("ACCOUNT", "ru");

AccountActions.register("fetch", AccountApi.fetch, "read");
AccountActions.register("patch", AccountApi.patch, "update");

AccountActions.fetchCurrent = function fetchCurrent() {
    return async dispatch => {
        dispatch(this.fetch(getSessionUserId()));
    };
};

export default AccountActions;
```

### Warning on actions

The way javascript works with function parameters constrains to only
use API methods that takes only one argument.  It's because of the way
`register` works by passing arguments of the action to the api method.

Example:
```javascript
AccountApi.patch = async ({ id, data }) => {
    return axios.patch(`${ACCOUNT_DETAIL}${id}/`, data);
}
```

It's up to the `mapDispatchToProps` to call the method with the
correct arguments.

```javascript
// Multiple to single argument
const mapDispatchToProps = dispatch => ({
    handleSubmit: (id, data) => dispatch(AccountActions.patch({ id, data }))
});
```
