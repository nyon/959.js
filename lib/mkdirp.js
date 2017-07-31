import fs from 'fs';
import path from 'path';

const mkdirp = function(dirname) {
  try {
    fs.mkdirSync(dirname);
    return true;
  } catch(err) {
    if(err.code === 'ENOENT') {
      return mkdirp(path.dirname(dirname));
    }
    return false;
  }
};

export default mkdirp;
