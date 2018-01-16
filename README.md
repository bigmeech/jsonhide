### JSONHIDE

A very simple utility that lets you store secret values in json files.

### Installation

``` npm install jsonhide --save ```

### API
###### ```hide.getValue```
Retrieves secret value in code

###### ```hide.setValue```
stores secret value in code

### CLI commands

##### init [filepath]
Generates an RSA key pair

##### import
Import an already exisiting json file. Can also contain placeholders that will get extrapolated for secrets.

##### create
Creates a json file for encryption/decryption

##### set-value [keyPath] [value]
Given a key, sets a secret value

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
