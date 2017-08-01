/* eslint no-bitwise: ["error", { "allow": ["&", ">>"] }] */
import fs from 'fs';
import path from 'path';
import moment from 'moment';
import ChildProcess from 'child_process';
import mkdirp from './mkdirp';

export default class FileSystem {
  constructor(baseDirectory) {
    mkdirp(baseDirectory);
    this.baseDirectory = baseDirectory;
    this.workingDirectory = '/';

    this.uidMapping = {};
    this.gidMapping = {};
    //                   000    001    010    011    100    101    110    111
    this.permMapping = ['---', '--x', '-w-', '-wx', 'r--', 'r-x', 'rw-', 'rwx'];
  }

  delete(file, callback) {
    fs.unlink(this.realPath(file), callback);
  }

  deleteDirectory(directory, callback) {
    fs.rmdir(this.realPath(directory), callback);
  }

  changeDirectory(directory) {
    this.workingDirectory = this.virtualPath(directory);
  }

  changePermissions(permissions, filename, callback) {
    const octalPermissions = parseInt(permissions, 8);
    fs.chmod(this.realPath(filename), octalPermissions, callback);
  }

  createDirectory(directory, callback) {
    fs.mkdir(this.realPath(directory), callback);
  }

  readFile(file, callback) {
    fs.readFile(this.realPath(file), callback);
  }

  writeFile(file, callback, options = {}) {
    callback(fs.createWriteStream(this.realPath(file), options));
  }

  virtualPath(file) {
    return path.resolve(this.workingDirectory, file);
  }

  realPath(file) {
    return path.join(this.baseDirectory, this.virtualPath(file));
  }

  renameFile(source, target, callback) {
    fs.rename(this.realPath(source), this.realPath(target), callback);
  }

  appendFile(file, callback) {
    return this.writeFile(this.realPath(file), callback, { flags: 'a' });
  }

  pwd() {
    return this.workingDirectory;
  }

  uidToUsername(uid) {
    if(this.uidMapping[uid]) {
      return this.uidMapping[uid];
    }
    const result = ChildProcess.spawnSync('getent', ['passwd', uid]);
    const stdout = result.stdout.toString();
    this.uidMapping[uid] = stdout.split(':')[0] || uid;
    return this.uidMapping[uid];
  }

  gidToGroupname(gid) {
    if(this.gidMapping[gid]) {
      return this.gidMapping[gid];
    }
    const result = ChildProcess.spawnSync('getent', ['group', gid]);
    const stdout = result.stdout.toString();
    this.gidMapping[gid] = stdout.split(':')[0] || gid;
    return this.gidMapping[gid];
  }

  eachFile(callback) {
    const dir = this.realPath('.');
    fs.readdirSync(dir).forEach((file) => {
      try {
        const stat = fs.statSync(path.join(dir, file));
        const mode = stat.mode;
        const ownerMode = (mode >> 6) & 7;
        const groupMode = (mode >> 3) & 7;
        const otherMode = (mode) & 7;
        const username = this.uidToUsername(stat.uid);
        const group = this.gidToGroupname(stat.gid);
        const ownerPermissions = this.permMapping[ownerMode];
        const groupPermissions = this.permMapping[groupMode];
        const otherPermissions = this.permMapping[otherMode];

        callback({
          isDirectory: stat.isDirectory(),
          username,
          group,
          ownerPermissions,
          groupPermissions,
          otherPermissions,
          size: stat.size,
          date: moment(stat.mtime).format('MMM DD HH:mm'),
          name: file,
        });
      } catch(error) {
        // Skip files which cause errors
      }
    });
  }
}
