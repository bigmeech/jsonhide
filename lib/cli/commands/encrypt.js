function executeHandler(argv) {

}

exports.command = 'encrypt';
exports.describe = 'Encrypt a values in jsonfile by keyPaths';
exports.builder = executeHandler;
exports.handler = (argv) => {
    console.log(`Encrypting jsonfile ${argv}`);
};