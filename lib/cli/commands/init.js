/**
 *  @command - init
 *  @decription - Init command creates a json file and fills it in with values. it gives you a step by step prompt to fill in secret values in as much depht as you want
 *  
 *  - creates a json file if ran with the command --create 
 *      jsoncrypt init --create --in config.json
 * 
 *  - assumes that config.json file exists by default
 *      jsoncrypt init --in config.json
 */

 const { isNull }  = require('lodash');
 const assert = require('assert-plus');
 const { crypto } = require('../util');
 const { createConfigFile, initPublicKey } = require('../operations');

 /**
  * 
  * init command handler
  *
  * @param {*} argv 
  */
 function executeHandler(argv) {
    initPublicKey();
    if(argv.input && argv.create) {
        createConfigFile(argv.input, argv.create);
    }
 }


 function parseCommand(yargs) {
    yargs
        .usage('Usage: $0 init --create --input [path/to/json/file]')
        .options('create', {
            alias: 'c',
            describe: 'flag to create a file if input file is not found',
            type:'boolean',
            default: true,
        })
        .option('input', {
            alias: 'i',
            type: 'string',
            describe: 'input source of jsonfile',
        })
        .option('output', {
            alias: 'o',
            type: 'string',
            describe: 'output directory of keys (Defaults to current directory)',
        });
 }

 exports.command = 'init [filepath]';
 exports.describe = 'Generates an RSA key pair';
 exports.builder = parseCommand;
 exports.handler  = executeHandler;