import EventEmitter from 'events';
import FileSystem from './file-system';
import ControlConnection from './control-connection';
import DataConnection from './data-connection';
import ClientState from './client-state';

import hash from './hash';

export default class Client extends EventEmitter {
  constructor(server) {
    super();

    this.fs = null;

    this.server = server;

    this.config = this.server.config;

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
        const baseDirectory = user.baseDirectory || `/home/${username}`;
        this.fs = new FileSystem(baseDirectory);
        return true;
      }
    }
    this.fs = null;
    return false;
  }

  acquirePort() {
    return this.server.acquirePortFor(this);
  }
}
