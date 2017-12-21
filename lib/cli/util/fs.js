const fs = require('fs');
const { log } = require('../util');
const Promise = require('bluebird');
const  { bind } = require('lodash');
/**
 * read data from a file on the file system
 * @param {*} path 
 */
function readFileFn(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
            return (err !== null) ? reject(err) : resolve(data);
        });
    }); 
};

/**
 * writes data to a file on the file system
 * @param {*} path 
 * @param {*} data 
 */
function writeFileFn(path, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, (err, data) => {
            return (err !== null) ? reject(err) : resolve(data);
        });
    }); 
};

/**
 * Checks the existence of a file
 * @param {*} filePath 
 */
function existsFn(filePath) {
    return new Promise((resolve, reject) => {
        fs.exists(filePath, (exists) => {
            return resolve(exists);
        });
    });
}

/**
 * writes json data to a file
 * @param {*} filePath 
 * @param {*} data 
 */
function jsonWriterFn(filePath, data) {
    return new Promise.try(() => {
        return JSON.stringify(data, null, 4);
    })
    .then((jsonString) => {
        return writeFileFn(filePath, jsonString)
    })
    .catch((err) => {
        return Promise.reject(err);
    });
}

/**
 * 
 * reads json file and passes data to caller
 * @param {*} filePath 
 */
function jsonReaderFn(filePath) {
    return readFileFn(filePath)
    .then((data) => {
        return Promise.try(() => {
            return JSON.parse(data);
        })
        //just return data the way it is if good
        .then(data => data)
        .catch(err => {
            // if error message indicates an empty file (.i.e trying to JSON.parse undefined), 
            // dont treat this as an error, just 
            // Promise.resolve({}) to an empty object
            log.error(err.message);
        });
    })
}

exports.readFile = readFileFn;
exports.writeFile = writeFileFn;
exports.checkExists = existsFn;
exports.jsonWriter = jsonWriterFn;
exports.jsonReader = jsonReaderFn;