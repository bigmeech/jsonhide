### JSONCRYPT

A very simple utility that lets you store secret values in json files.

## Installation

``` npm install jsoncrypt --save ```

## CLI


## Example

To read values from code

```js
const path = require('path');
const JSONCrypt = require('jsoncrypt');

const crypt = JSONCrypt({ 
    configPath: 'config.json',
    rsaPrivateKeyPath: path.resolve(__dirname, process.cwd(),'./.jsoncrypt.private'),
});

const apiKey = crypt.getValue('github.apiKey')

console.log(apiKey) // real api key;
```
