# redux-api

This package is a framework to integrate redux with a REST api.

It provides, generic reducers and actions for all rest methods :
(create, read, update, delete and list).

## State

Each resource will have it's own reducer creating the following state:


```json
{
    error: bool,
    errorCode: number,
    errors: Object,
    loading: bool,
    result: Object, # TODO
    mode: string, # TODO
    status: string, # TODO
    item: Object,
    workingItem: Object, # TODO
    items: Object
}
```

- error: a boolean indicating if there is error on the last request.
- errorCode: a number corresponding to the HTTP error code returned by the last request.
- errors: result of the HTTP request.
- loading: a boolean indicating if the request is processing.

### Items
