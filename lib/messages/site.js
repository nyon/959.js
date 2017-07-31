// Supported SITE commands:

import CHMOD from './site-chmod';

const siteCommands = {
  CHMOD,
};

export default function(client, parameters) {
  const siteCommandTokens = parameters.split(' ');
  const siteCommandName = siteCommandTokens.shift().toUpperCase();
  const siteCommand = siteCommands[siteCommandName];
  const siteParameters = siteCommandTokens.join(' ');

  if(typeof siteCommand === 'function') {
    siteCommand(client, siteParameters);
  } else {
    client.control.send('502 Command not implemented.');
  }
}
