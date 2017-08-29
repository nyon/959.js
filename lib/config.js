import fs from 'fs';

export default class Config {
  constructor(filename) {
    const config = JSON.parse(fs.readFileSync(filename));

    this.users = config.users || [];
    this.ports = Config.parsePorts(config.passivePorts || ['10000-11000']);
  }

  static parsePorts(unparsedPorts) {
    const ports = [];
    unparsedPorts.forEach((portOrRange) => {
      const stringifiedPortOrRange = `${portOrRange}`;
      if(stringifiedPortOrRange.indexOf('-') === -1) {
        // This should a simple port
        ports.push(parseInt(portOrRange, 10));
      } else {
        // This should be a range
        let [fromPort, toPort] = stringifiedPortOrRange.split('-', 2);
        fromPort = parseInt(fromPort, 10);
        toPort = parseInt(toPort, 10);
        for(let port = parseInt(fromPort, 10); port <= toPort; port += 1) {
          ports.push(port);
        }
      }
    });
    return ports;
  }
}
