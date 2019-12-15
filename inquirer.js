const inquirer = require('inquirer');

module.exports = {
  askPastebinCredentials: () => {
    const questions = [
      {
        name: 'username',
        type: 'input',
        prefix: '->',
        message: 'Enter your Pastebin username or e-mail address:',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your username or e-mail address.';
          }
        }
      },
      {
        name: 'password',
        type: 'password',
        prefix: '->',
        message: 'Enter your password:',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your password.';
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },
  askContentToPaste: () => {
    const questions = [
      {
        name: 'content',
        type: 'input',
        prefix: '->',
        message: 'Enter text to paste:',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter text to paste.';
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },
};