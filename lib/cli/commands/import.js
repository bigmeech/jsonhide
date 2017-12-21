exports.command = 'import';
exports.describe = 'Import an already exisiting json file with secret placeholders';
exports.builder = {};
exports.handler = (argv) => {
    console.log(`importing jsonfile ${argv}`);
};