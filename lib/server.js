/*
 * 959.js
 * https://github.com/nyon/959.js
 *
 * Copyright (c) 2017 Timm Decker
 * Licensed under the MIT license.
 */

import net from 'net';
import Client from './client';
import Config from './config';
import PortManager from './port-manager';

export default class Server {
  constructor() {
    this.clients = [];
    this.server = net.createServer(this.onAccept.bind(this));
    this.portManager = new PortManager(this);
  }

  // Is called when a new client connects to the server
  onAccept(socket) {
    // Reload config for every new client
    this.config = new Config('ftp-config.json');

    const client = new Client(this);

    this.clients.push(client);

    client.on('control.end', () => {
      this.portManager.releasePortFor(client);
      this.clients.splice(this.clients.indexOf(socket), 1);
    });

    client.control.acceptAndWelcomeClient(socket);
  }

  start(host, port = 21) {
    this.server.listen(port, host);
  }

  acquirePortFor(client) {
    return this.portManager.acquirePortFor(client);
  }
}
