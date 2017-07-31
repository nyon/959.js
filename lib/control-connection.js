import EventEmitter from 'events';
import messages from './messages';

export default class ControlConnection extends EventEmitter {
  constructor(client) {
    super();
    this.client = client;
    this.socket = null;
    this.encoding = 'utf8';
  }

  acceptAndWelcomeClient(socket) {
    this.socket = socket;
    this.socket.on('data', this.handleCommand.bind(this));
    this.socket.on('end', () => {
      this.emit('end');
    });
    this.send('220 Service ready for new user.');
  }

  handleCommand(data) {
    const line = data.toString().trim();
    const firstSpace = line.indexOf(' ');
    let command = line;
    let parameters = '';

    console.log(`C< ${line}`);

    if(firstSpace !== -1) {
      command = line.slice(0, firstSpace);
      parameters = line.slice(firstSpace + 1);
    }
    const commandHandler = messages[command];

    if(typeof commandHandler !== 'function') {
      this.send('502 Command not implemented');
    } else {
      commandHandler(this.client, parameters);
    }
  }

  send(message) {
    const encodedMessage = `${message}\r\n`;
    console.log(`C> ${encodedMessage}`);
    this.socket.write(encodedMessage, this.encoding);
  }
}
