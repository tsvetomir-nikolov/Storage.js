[![Build Status](https://api.travis-ci.org/tsvetomir-nikolov/Storage.js.png?branch=master)](https://travis-ci.org/tsvetomir-nikolov/Storage.js)

# Storage.js

Value type saving upon working with localStorage.

Works with the following types:
- String
- Number
- Boolean
- Date
- Object
- Array

## Examples:

Using value of type number

```js
storage.setItem('key', 21);
storage.getItem('key'); // Returns 21
```

Boolean value

```js
storage.setItem('key', true);
storage.getItem('key'); // Returns true
```

Object value

```js
storage.setItem('key', { prop1: 21 });
storage.getItem('key'); // Returns the object
```

## Storage records

Value types are stored in separated record from the value for better compatibility.

Resources:

Key                | Value
------------------ | -------------
myKey              | {"prop1":21}
myKey.ValueType    | object