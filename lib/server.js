/*
 * 959.js
 * https://github.com/nyon/959.js
 *
 * Copyright (c) 2017 Timm Decker
 * Licensed under the MIT license.
 */

import net from 'net';
import Client from './client';

export default class Server {
  constructor() {
    this.clients = [];
    this.server = net.createServer(this.onAccept.bind(this));
  }

  // Is called when a new client connects to the server
  onAccept(socket) {
    const client = new Client();

    this.clients.push(client);

    client.on('control.end', () => {
      this.clients.splice(this.clients.indexOf(socket), 1);
    });

    client.control.acceptAndWelcomeClient(socket);
  }

  start(host, port = 21) {
    this.server.listen(port, host);
  }
}
