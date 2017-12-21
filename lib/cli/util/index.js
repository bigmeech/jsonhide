const fs = require('../util/fs');
const assert = require('assert-plus');
const SimpleLogger = require('simple-node-logger');

const crypto = require('./crypto');
const logger = SimpleLogger.createSimpleLogger();

exports.log = logger;
exports.crypto = crypto;
exports.fs = require('./fs');

/**
 * get public pem
 */
exports.getPublicPem = function (keyPath) {
    return fs.readFile(keyPath);
}

/**
 * get private pems
 */
exports.getPrivatePem = function() {
    if(!keyPath) throw new Error('Path to private key required!');
    return fs.readFile(keyPath).catch(err => {
        logger.fatal(err);
    });  
}
