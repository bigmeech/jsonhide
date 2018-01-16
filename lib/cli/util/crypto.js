const fs = require('./fs');
const path = require('path');
const RSA = require('node-rsa');
const { log } = require('../util');
const Promise = require('bluebird');

const rsa = new RSA();

/**
 * create public and private key pairs
 * .jsonhide is public while .jsoncrpt.private
 */
exports.createKeyPairs = function createKeyPairsFn () {
    rsa.generateKeyPair();
    const publicPemString = rsa.exportKey('pkcs8-public-pem');
    const privatePemString = rsa.exportKey('pkcs8-private');
    const publicKeyFilePath = path.resolve(__dirname, process.cwd(), '.jsonhide');
    const privateKeyFilePath = path.resolve(__dirname, process.cwd(), '.jsonhide.private');

    return Promise.all([
        fs.writeFile(publicKeyFilePath, publicPemString),
        fs.writeFile(privateKeyFilePath, privatePemString)
    ]).then(() => {
        console.log('Private key written to: ', privateKeyFilePath);
        console.log('Public key written to: ', publicKeyFilePath);
    });
}

/**
 * make key from supplied pem string
 * @param {*} rsaPrivateKey 
 */
function makeKeyFromPrivatePemFn(rsaPrivateKey) {
    return new RSA(rsaPrivateKey);
}

/**
 * generic function lets you create keys from 
 * both public and private pem strings.
 * @param {*} keyString 
 * @param {*} keyType 
 */
function createKeyFromPemString(keyString, keyType) {
    const rsa = new RSA();
    rsa.importKey(keyString, keyType);
    return rsa;
}

/**
 * encrypts plain text 
 * @param {*} plainText 
 * @param {*} publicKey 
 */
function encryptFn (plainText, publicKey) {
    const rsaKey = createKeyFromPemString(publicKey, 'pkcs8-public');
    return rsaKey.encrypt(plainText, 'base64');
}

/**
 * decrypts cipher
 * @param {*} cipher 
 * @param {*} privateKey 
 */
function decryptFn (cipher, privateKey) {
    const rsaKey = createKeyFromPemString(privateKey, 'pkcs8-private');
    return rsaKey.decrypt(cipher).toString();
}

exports.encrypt = encryptFn;
exports.decrypt = decryptFn;
exports.makeKeyFromPrivatePem = makeKeyFromPrivatePemFn;