### JSONHIDE

A very simple utility that lets you store secret values in json files.

## Installation

``` npm install jsonhide --save ```

## CLI


## Example

To read values from code

```js
const path = require('path');
const Hide = require('jsonhide');

const hide = Hide({ 
    configPath: 'config.json',
    rsaPrivateKeyPath: path.resolve(__dirname, process.cwd(),'./.jsonhide.private'),
});

const apiKey = hide.getValue('github.apiKey')

console.log(apiKey) // real api key;
```
