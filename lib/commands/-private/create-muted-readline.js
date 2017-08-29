import readline from 'readline';
import { Writable } from 'stream';

export default function() {
  const mutableStdout = new Writable({
    write(chunk, encoding, callback) {
      if(!this.muted) {
        process.stdout.write(chunk, encoding);
      }
      callback();
    },
  });

  mutableStdout.muted = false;

  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: mutableStdout,
    terminal: true,
  });

  readlineInterface.mute = () => {
    mutableStdout.muted = true;
  };

  return readlineInterface;
}
