import readline from 'readline';
import { Writable } from 'stream';

export default function() {
  var mutableStdout = new Writable({
    write: function(chunk, encoding, callback) {
      if (!this.muted) {
        process.stdout.write(chunk, encoding);
      }
      callback();
    }
  });

  mutableStdout.muted = false;

  let readlineInterface = readline.createInterface({
    input: process.stdin,
    output: mutableStdout,
    terminal: true
  });

  readlineInterface.mute = function() {
    mutableStdout.muted = true;
  }

  return readlineInterface;
}
