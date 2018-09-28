# redux-crudo

[![Build Status](https://travis-ci.org/thanxngo/redux-crudo.svg?branch=master)](https://travis-ci.org/thanxngo/redux-crudo)

[![Coverage Status](https://coveralls.io/repos/github/thanxngo/redux-crudo/badge.svg?branch=master)](https://coveralls.io/github/thanxngo/redux-crudo?branch=master)

A package for writing convention-driven reducers and actions for Redux.

It provides, generic reducers and actions for all rest methods and
a generic post methods: (create, read, update, delete, list and post).


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
  loading: false,
  status: "",
  statusCode: 0,
}
```

- args: is set to action.payload in all **REQUEST** actions.
- item: is the item in *READ* & *UPDATE* actions.
- items: is a Map() used in *LIST* actions, For now Map() objects are
  sorted according to the API result and can be accessed by their
  uuid. For now only uuid keyed items are supported. **TODO** : handle
  any kind of primary key.
- error: boolean if last request failed or not.
- errors: set to response.data (if action is generated with the register method and used the standard api wrapper).
- loading: set to true in **REQUEST** set to false in **FAILURE** or **SUCCESS**.
- status: name of last action, e.g "create_request", "create_success", etc.
- statusCode: http code response.

## Reducers

### Example of a reducer

```javascript
/**
 * Account reducers.
 */
import { combineReducers } from "redux";
import { CREATE, READ, UPDATE, DELETE, LIST, POST } from "redux-crudo/utils";
import { apiReducer } from "redux-crudo/reducers";

// Handle read and update
export default const accountReducer = apiReducer("ACCOUNT", READ | UPDATE);
```

## Actions

```
const AccountActions = apiActions("ACCOUNT", READ | UPDATE);
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
```

## Assign a crud operation

```
import { apiActions, assignCrudMethod } from "redux-crudo/actions";
const AccountActions = apiActions("ACCOUNT", READ | UPDATE);
// Given that Services.Account.create is the api call method
AccountActions.create = assignCrudMethod(
    AccountActions,
    Services.Account.create,
    CREATE
);
```

#### Note on the api method.

Api methods must by *async* and behave like
[axios](https://github.com/axios/axios) methods.

The `assignCrudMethod` return an action that behave like this:

```javascript
try {
    const response = await apiMethod(args);
    dispatch(SUCCESS(response.status, response.data));
} catch (error) {
    dispatch(FAILURE(error.response.status, error.response.data));
}
```

So the API method should return a `{response: { data: "...", status:
200}}` object on success. And raise a `error = {response: { data:
"...", status: 200}}` on failure.


### Warning on actions

API methods should only take one context object and destructuring it.

Example:
```javascript
Services.Account.update. = async ({ id, data }) => {
    return axios.patch(`${ACCOUNT_DETAIL}${id}/`, data);
}
```

Pay attention when writing `mapDispatchToProps` to not destructuring too early.

```javascript
const mapDispatchToProps = dispatch => ({
    handleSubmit: {(id, data)} => dispatch(AccountActions.update({ id, data }))
    // or
    handleSubmit: payload => dispatch(AccountActions.update(payload))
});
```
