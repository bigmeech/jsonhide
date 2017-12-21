function executeHandler(argv) {
    
}
    
exports.command = 'create';
exports.describe = 'create a jsonfile for ecryption/decryption';
exports.builder = executeHandler;
exports.handler = (argv) => {
    console.log(`importing jsonfile ${argv}`);
};