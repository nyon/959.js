export default class PortManager {
  constructor(server) {
    this.server = server;
    this.clientToPort = {};
    this.portToClient = {};
  }

  acquirePortFor(client) {
    if(this.clientToPort[client]) {
      return this.clientToPort[client];
    }
    const availablePorts = this.server.config.ports;
    for(let i = 0; i < availablePorts.length; i += 1) {
      const port = availablePorts[i];
      if(!this.portToClient[port]) {
        this.portToClient[port] = client;
        this.clientToPort[client] = port;
        return port;
      }
    }
    return false;
  }

  releasePortFor(client) {
    const port = this.clientToPort[client];
    if(port) {
      delete this.clientToPort[client];
      delete this.portToClient[port];
    }
  }
}
