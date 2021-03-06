import fs from 'fs';

import hash from '../hash';
import createSimpleReadline from './-private/create-simple-readline';
import createMutedReadline from './-private/create-muted-readline';
import askForUsernameIfNone from './-private/ask-for-username-if-none';

function askForPassword(forUser) {
  return new Promise((resolve) => {
    const rl = createMutedReadline();
    rl.question(`Password for ${forUser}: `, (password) => {
      rl.close();
      resolve(`sha512#${hash('sha512', forUser, password)}`);
    });
    rl.mute();
  });
}

function askForDirectory(forUser) {
  return new Promise((resolve) => {
    const rl = createSimpleReadline();
    rl.question(`Working directory for ${forUser}: `, (directory) => {
      rl.close();
      resolve(directory);
    });
  });
}


function handleUsername(username) {
  const preparedUserEntry = { username };
  return askForPassword(username).then((password) => {
    preparedUserEntry.password = password;
    return askForDirectory(username);
  }).then((directory) => {
    preparedUserEntry.directory = directory;
    return preparedUserEntry;
  });
}

export default function(givenUsers) {
  askForUsernameIfNone(givenUsers)
      .then(users => Promise.all(users.map(handleUsername))).then((preparedUserEntries) => {
        const config = JSON.parse(fs.readFileSync('ftp-config.json'));
        const newUsers = preparedUserEntries.map(user => user.username);
        config.users = (config.users || []).filter(user => newUsers.indexOf(user.username) === -1);

        config.users.push(...preparedUserEntries);
        fs.writeFileSync('ftp-config.json', JSON.stringify(config, null, '\t'));
      });
}
