import net from 'net';
import EventEmitter from 'events';

export default class DataConnection extends EventEmitter {
  constructor(client) {
    super();
    this.client = client;
    this.socket = null;
    this.sendBuffer = [];
    this.encoding = 'binary';
  }

  setEncoding(encoding) {
    this.encoding = encoding;
  }

  start(port) {
    this.clearBuffers();
    const lowerPort = port % 256;
    const higherPort = parseInt(port / 256, 10);

    const server = net.createServer();
    server.on('listening', () => {
      this.client.control.send(`227 Entering Passive Mode (127,0,0,1,${higherPort},${lowerPort}).`);
      this.emit('listening');
    });
    server.on('connection', (socket) => {
      this.socket = socket;
      this.socket.setEncoding(this.encoding);

      this.emit('connection', this.socket);

      this.socket.on('data', (data) => {
        this.emit('data', data);
      });

      this.socket.on('close', () => {
        this.client.control.send('226 Closing data connection.');
        server.close();
        this.socket = null;
        this.removeAllListeners();
      });
    });
    server.listen(port);
  }

  transfer(callable) {
    if(this.socket) {
      callable(this.socket);
    } else {
      this.on('connection', callable);
    }
  }

  clearBuffers() {
    this.sendBuffer = [];
  }

  send(message) {
    if(this.socket) {
      this.socket.write(message, this.encoding);
    } else {
      this.sendBuffer.push(message);
    }
  }
}
