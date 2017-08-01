import fs from 'fs';
import path from 'path';

export default function mkdirp(dirname) {
  try {
    fs.mkdirSync(dirname);
    return true;
  } catch(err) {
    if(err.code === 'ENOENT') {
      return mkdirp(path.dirname(dirname));
    }
    return false;
  }
}
