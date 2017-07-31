import fs from 'fs';

export default class Config {
  constructor(filename) {
    const config = JSON.parse(fs.readFileSync(filename));

    this.users = config.users || [];
  }
}
