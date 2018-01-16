const { get } = require('lodash');
const path = require('path');
const fs = require('fs');
const assert = require('assert-plus');
const { crypto } = require('../lib/cli/util');

function getApi(options, configProps) {
    return {
        /**
         * gets a value from the config,
         * send a flag to know if it should 
         * retrieve the value in plain text or not
         * @param {*} keyPath 
         */
        getValue(keyPath, decryptValue) {
            const privateKey = fs.readFileSync(options.rsaPrivateKeyPath, {
                encoding:'utf-8',
            });
            const cipher = get(configProps, keyPath, null);
            console.log('decrypting: ', cipher);
            console.log('with private key: ', privateKey)
            const value = crypto.decrypt(cipher, privateKey)
            return value;
        },
        /**
         * lets you set values into the configuration,
         * pass in a final parameter to encrypt the value
         * @param {*} keyPath 
         * @param {*} value 
         * @param {*} encrypt 
         */
        setValue(keyPath, value, encrypt) {

        },

        readConfig(readConfigPath) {},
    };
    return api;
}
module.exports = function JSONCrypt(options) {
    // assertions
    assert.string(options.configPath, 'options.configPath');

    const defaultPrivateKeyPath = path.resolve(__dirname, process.cwd(), '.jsonhide.private');

    // read config file
    const configPath = options.configPath;
    const absConfigPath = path.resolve(__dirname, process.cwd(), configPath);
    const rawConfigObject = require(absConfigPath);

    // if custom private pem file path is provided, use it, else find one
    // inside the project root. if none is found, nag about it.
    const useDefaultPrivateKey = (!!options.rsaPrivateKeyPath && fs.existsSync(defaultPrivateKeyPath));
    if (useDefaultPrivateKey) {
        options.rsaPrivateKeyPath = defaultPrivateKeyPath;
    }

    console.log('use default?', useDefaultPrivateKey);
    console.log('has rsaPrivatekeypath?', !!options.rsaPrivateKeyPath);
    console.log('exists in root?', fs.existsSync(defaultPrivateKeyPath));
    console.log('rsaPrivateKeypath?', options.rsaPrivateKeyPath);
    console.log('defaultKeypath?', defaultPrivateKeyPath);
    // defaultPrivateKeyPath

    return getApi(options, rawConfigObject);
}