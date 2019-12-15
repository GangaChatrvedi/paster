#!/usr/bin/env node

const program = require('commander');
const { pastebinLogin, pushFile } = require('./cli');

program.version('1.0.0').description('Command line Paster Application')

program
  .command('login')
  .alias('l')
  .description('see the current weather in the specified city')
  .action(() => pastebinLogin())

program
  .command('push <floc>')
  .alias('p')
  .description('push file to paste file content to pastebin')
  .action(floc => pushFile(floc))

program.parse(process.argv)