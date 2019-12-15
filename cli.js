

//grab provided args.

const axios = require('axios');
const qs = require('querystring')
const os = require('os')
var fs = require("fs");

const inquirer = require('./inquirer');
const path = os.homedir() + '/.pastebin'

const api_dev_key = 'ddfba64ebbe2186a7f8adc7c1c9b948c';

var requestBody = {
  api_dev_key: api_dev_key
}


const url = 'https://pastebin.com/api/api_login.php';
const pasteURl = 'https://pastebin.com/api/api_post.php';

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}


const pastebinLogin = async () => {
  const credentials = await inquirer.askPastebinCredentials();
  requestBody['api_user_name'] = credentials.username;
  requestBody['api_user_password'] = credentials.password;
  getUserKey();
};

const checkIfUserKey = () =>{
  return fs.existsSync(path);
}

const createBlankPaste = () =>{
  return {
    api_dev_key: api_dev_key,
    api_option: 'paste',
    api_paste_private: 0,
  };
}

const getCredentials = () =>{
  let data = fs.readFileSync(path, 'utf8');
  return data;
}

const createPaste = (pasterBody) => {
  axios.post(pasteURl, qs.stringify(pasterBody), config)
    .then((result) => {
      console.log(result.data);
    })
    .catch((err) => {
      console.log("airor");
    });
}


const pushFile = async (floc) => {
  const user_key = getCredentials();

  var pasterBody = createBlankPaste();
  pasterBody["api_user_key"] = user_key;
  cloc = process.cwd() + "/" + floc;
  let data = fs.readFileSync(cloc, 'utf8');
  pasterBody["api_paste_code"] = data;

  createPaste(pasterBody);
};

let status = checkIfUserKey();


const saveCredentials = (data) =>{
  fs.writeFile(path, data, (err)=>{console.log(err != null? err : 'Logged in succesfully');});
}

const getUserKey = () =>{
  axios.post(url, qs.stringify(requestBody), config)
  .then((result) => {
    saveCredentials(result.data);
  })
  .catch((err) => {
    console.log(err);
  })
}

module.exports = {
  pastebinLogin,
  pushFile
}






