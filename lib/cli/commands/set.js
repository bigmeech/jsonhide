const assert = require('assert-plus');
const path = require('path');
const { set, get } = require('lodash');
const { jsonWriter, jsonReader } = require('../util/fs');
const { getPublicPem, log, crypto, fs } = require('../util');

const DEFAULT_PUBLIC_KEY = '.jsonhide';
function parseCommandFn(yargs) {
    yargs
        .usage('Usage: $0 --set-value --key [keyName] --value [value] --file [path/to/json/file]')
        .options('keyPath', {
            alias: 'k',
            describe: 'Key to set (supports dot notation for nested structures)',
            required: true,
            type:'string',
        })
        .options('value', {
            alias: 'v',
            describe: 'Value to set with key',
            required: true,
            type:'string',
        })
        .options('target', {
            alias: 't',
            describe: 'JSON file to update',
            required: true,
            type:'string',
        })
        .options('public-key', {
            alias: 'p',
            describe: 'Path to public key (Looks for .jsonhide in project root if not provided)',
            type:'string',
        })
}

/**
 * encrypt value and return cipher
 * @param {*} options
 */
function encryptValue(options) {
    return (publicKey) => {
        log.info('calling encrypt function');
        return crypto.encrypt(options.value, publicKey);
    }
}

function decryptCipher(options) {
    return (privateKey) => {
        log.info('calling internal decrypt function');
        return crypto.decrypt(jsonKeyPath, cipher, privateKey);
    }
}


// NOTE: Writer should write to json structure in 
// NOTE: append-only way and not overwrite existing data
function writeValues(options) {
    return (cipher) => {
        const data = {
            [options.keyPath]: cipher
        };

        jsonReader(options.target)
        .then((data) => {
            return set(data || {}, options.keyPath, cipher);
        }).then((finalData) => {
            return jsonWriter(options.target, finalData);
        })
    }
}

exports.command = 'set-value [keyPath] [value]';
exports.describe = 'Given a key, sets a secret value';
exports.builder = parseCommandFn;


/**
 * If user does not pass public pem string,
 * try a default one which should be in the
 * project root.
 * 
 * if you cant find the one in the project root,
 * raise hell!!!
 */
exports.handler = (options) => {
    const pathToDefaultPublicKey = path.resolve(__dirname, process.cwd(), '.jsonhide')
    // always assume there is a public key in project root and use that;
    if(!options['public-key']) {
        log.info('Using default encryption keys');
        return fs.checkExists(pathToDefaultPublicKey)
            .then(isExists => {
                console.log('public pem exists?', isExists);
                return getPublicPem(DEFAULT_PUBLIC_KEY);
            })
            .then(encryptValue(options))
            .then(writeValues(options));
    }

    // use supplied public key to encrypt value
    log.info('Using specifiied encryption keys');
    return getPublicPem(options['private-key'])
        .then(encryptValue(options));

}