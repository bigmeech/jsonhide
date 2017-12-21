const path = require('path');
const touch = require('touch');
const asset = require('assert');
const RSA = require('node-rsa');
const fs = require('./util/fs');
const Promise = require('bluebird');
const { isNull } = require('lodash');
const { crypto, log } = require('./util')

/**
 * return parse json file content and returns parsed object;
 * @param {*} filePath 
 * @returns object
 */
function createConfigFileFn(filePath, createIfExists) {
    // TODO: get working directory from the module consuming this
    // TODO: code and resolve input json file from it.
    const absWorkingDir = path.resolve(__dirname, process.cwd());
    const absFilePath = path.resolve(absWorkingDir, filePath);

    return fs.checkExists(absFilePath).then(exists => {
        // if the --create flag was not used, throw file not found
        if(!createIfExists) {
            throw new Error(`Could not load json content at ${absPathFilePath}`);
        }
        if(!exists) {
            touch.sync(absFilePath);
        }
        return absFilePath
    })
    /**
    .then(fs.readFile)
    .then(fileContents => {
        if(!fileContents) {
            throw new Error('Input file is empty');
        }
        return Promise.try(() => {
            return JSON.parse(fileContents);
        })
    })
    **/
    .catch(err => {
        log.error(err.message);
    });
};

/**
 *  dumps public key somewhere to be used to encrypt values;
 */
function initPublicKeyFn () {
    log.info('Generating Key Pairs.....');
    const keyInfo = crypto.createKeyPairs();
}

/**
 * well, it sets secret values
 * @param {*} keyPath 
 * @param {*} value 
 */
function setSecretFn (keyPath, value) {
    crypto.encrypt(value);
}

exports.setSecret = setSecretFn;
exports.createConfigFile = createConfigFileFn;
exports.initPublicKey = initPublicKeyFn;