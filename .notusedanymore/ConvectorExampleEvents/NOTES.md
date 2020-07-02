# NOTES

## Fix Dependencies

- [error TS8020: JSDoc types can only be used inside documentation comments](https://github.com/sweetalert2/sweetalert2/issues/1861)

add `"typescript": "^3.8.3"` to `package.json`

```shell
$ npm i
to prevent error
../../node_modules/@types/chai/index.d.ts(124,9): error TS8020: JSDoc types can only be used inside documentation comments.
../../node_modules/@types/chai/index.d.ts(125,9): error TS8020: JSDoc types can only be used inside documentation comments.
../../node_modules/@types/chai/index.d.ts(129,16): error TS2370: A rest parameter must be of an array type.
```

stopped here

```shell
$ hurl invoke official official_create "{\"name\":\"my first request\",\"id\":\"0001\",\"created\":0,\"modified\":0}"
[hurley] - {"name":"my first request","id":"0001","created":0,"modified":0}
(node:4956) UnhandledPromiseRejectionWarning: TypeError: network.organizations.find is not a function
    at ChaincodeCLI.<anonymous> (/usr/local/lib/node_modules/@worldsibu/hurley/dist/cli.js:428:53)
    at step (/usr/local/lib/node_modules/@worldsibu/hurley/node_modules/tslib/tslib.js:139:27)
    at Object.next (/usr/local/lib/node_modules/@worldsibu/hurley/node_modules/tslib/tslib.js:120:57)
    at fulfilled (/usr/local/lib/node_modules/@worldsibu/hurley/node_modules/tslib/tslib.js:110:62)
```
