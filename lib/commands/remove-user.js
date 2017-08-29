import fs from 'fs';

import askForUsernameIfNone from './-private/ask-for-username-if-none';

export default function(givenUsers) {
  askForUsernameIfNone(givenUsers)
    .then((users) => {
      const userToRemove = users.shift();
      const config = JSON.parse(fs.readFileSync('ftp-config.json'));
      config.users = (config.users || []).filter(user => userToRemove !== user.username);
      fs.writeFileSync('ftp-config.json', JSON.stringify(config, null, '\t'));
    });
}
