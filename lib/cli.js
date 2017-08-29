import serve from './commands/serve';
import addUser from './commands/add-user';
import removeUser from './commands/remove-user';
import help from './commands/help';

const commands = {
  serve,
  addUser,
  removeUser,
};

export default function() {
  // slice off executable name and script file
  // ['node', '959.js', 'add-user', 'test_user', 'test_password']
  // ->
  // ['add-user', 'test_user', 'test_password']

  const parameters = process.argv.slice(2);

  if(parameters.length) {
      // transform dashed commands to camelCase ones:
      // add-user -> addUser
    const command = parameters[0].replace(/-[a-z]/g, match => match[1].toUpperCase());
    const commandParameters = parameters.slice(1);

    const commandHandler = commands[command];

    if(commandHandler) {
      commandHandler(commandParameters);
    } else {
      help();
    }
  } else {
    help();
  }
}
