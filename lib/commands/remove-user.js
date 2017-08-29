import fs from 'fs';

import askForUsernameIfNone from './-private/ask-for-username-if-none';

export default function(users) {
  askForUsernameIfNone(users)
    .then((users) => {
      let userToRemove = users.shift();
      let config = JSON.parse(fs.readFileSync('ftp-config.json'))
      config.users = (config.users || []).filter(user => {
        return userToRemove !== user.username;
      });
      fs.writeFileSync('ftp-config.json', JSON.stringify(config, null, '\t'));
    });
}