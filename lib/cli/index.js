#!/usr/bin/env node

const commands = require('./commands');

require('yargs')
    .command(commands.init)
    .command(commands.import)
    .command(commands.encrypt)
    .command(commands.create)
    .command(commands.set)
    .help()
    .argv;