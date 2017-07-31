import EventEmitter from 'events';
import FileSystem from './file-system';
import ControlConnection from './control-connection';
import DataConnection from './data-connection';
import ClientState from './client-state';
import Config from './config';

import hash from './hash';

export default class Client extends EventEmitter {
  constructor() {
    super();

    this.fs = null;

    this.config = new Config('ftp-config.json');

    this.state = new ClientState();

    this.control = new ControlConnection(this);

    this.data = new DataConnection(this);
  }

  login(username, password) {
    const users = this.config.users;
    for(let index = 0; index < users.length; index += 1) {
      const user = users[index];
      const [hashMethod, hashedPassword] = user.password.split('#');
      const hashedInputPassword = hash(hashMethod, username, password);

      if(hashedInputPassword === hashedPassword && username === user.username) {
        this.fs = new FileSystem('/tmp');
        return true;
      }
    }
    this.fs = null;
    return false;
  }

  acquirePort() {
    return 1337;
  }
}
